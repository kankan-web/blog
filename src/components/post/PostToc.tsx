import type { MarkdownHeading } from 'astro'
import { useState, useEffect, startTransition, useRef } from 'react'
import clsx from 'clsx'
import { useAtomValue } from 'jotai'
import { pageScrollLocationAtom, pageScrollDirectionAtom } from '@/store/scrollInfo'

function useActiveItem() {
  const [activeItem, setActiveItem] = useState('')
  // 监听滚动
  const scrollY = useAtomValue(pageScrollLocationAtom)

  useEffect(() => {
    const $article = document.querySelector('#markdown-wrapper')
    if (!$article) return
    const $headings = Array.from($article.querySelectorAll('h1, h2, h3, h4, h5, h6'))
    for (let i = 0; i < $headings.length; i++) {
      const item = $headings[i]
      const nextItem = $headings[i + 1]
      const itemTop = item.getBoundingClientRect().top
      const nextItemTop = nextItem ? nextItem.getBoundingClientRect().top : 10000
      if (itemTop <= 80 && nextItemTop > 80) {
        startTransition(() => {
          setActiveItem(item.id)
        })
        break
      }
    }
  }, [scrollY])

  return activeItem
}

/// 目录组件
export function PostToc({ headings }: { headings: MarkdownHeading[] }) {
  const activeItem = useActiveItem()
  //处理目录排序关系
  const itemList = Array.from(new Set(headings.map((item) => item.depth))).sort((a, b) => a - b) // 从小到大排序
  const newHeadItem = headings.map((item) => ({
    ...item,
    depth: itemList.findIndex((depth) => depth === item.depth),
  }))
  return (
    <ul className="h-full overflow-auto">
      {newHeadItem.map((item) => (
        <TocItem
          key={item.slug}
          slug={item.slug}
          text={item.text}
          depth={item.depth}
          isActive={item.slug === activeItem}
        />
      ))}
    </ul>
  )
}

export function TocItem({
  slug,
  text,
  depth,
  isActive,
}: {
  slug: string
  text: string
  depth: number
  isActive: boolean
}) {
  const itemRef = useRef<HTMLLIElement>(null)
  const scrollDirection = useAtomValue(pageScrollDirectionAtom)
  useEffect(() => {
    if (!isActive) return
    const $item = itemRef.current
    if (!$item) return
    const $container = $item.parentElement
    if (!$container) return

    const containerHeight = $container.clientHeight
    const itemHeight = $item.clientHeight + 4
    const itemOffsetTop = $item.offsetTop - 2 * itemHeight
    const scrollTop = $container.scrollTop

    const itemTop = itemOffsetTop - scrollTop
    const itemBottom = itemTop + itemHeight

    if (itemTop < 0 || itemBottom > containerHeight) {
      if (scrollDirection === 'up') {
        $container.scrollTop = itemOffsetTop - containerHeight + itemHeight
      } else {
        $container.scrollTop = itemOffsetTop
      }
    }
  }, [isActive])

  return (
    <li ref={itemRef} className={clsx('overflow-hidden px-4 my-1', isActive ? 'text-accent' : '')}>
      <a
        href={`#${slug}`}
        style={{ paddingLeft: `${depth * 20}px` }}
        className="block overflow-hidden  "
      >
        <span className={`block whitespace-nowrap overflow-hidden text-ellipsis`}>{text}</span>
      </a>
    </li>
  )
}
