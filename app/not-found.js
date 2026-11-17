import Link from 'next/link'

export default function NotFound() {
  return (
    <div>
      <h1>404</h1>
      <p>ничего не найдено</p>
      <Link href="/">вернуться домой</Link>
    </div>
  )
}