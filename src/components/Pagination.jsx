import { C } from "../theme.js";

export const PAGE_SIZE = 30;

export default function Pagination({ count, page, setPage }) {
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (pageCount <= 1) return null;

  return (
    <nav aria-label="分頁" className="my-3 flex flex-wrap items-center gap-3 text-sm" style={{ color: C.inkSoft }}>
      <button
        type="button"
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="rounded-full bg-white px-3 py-1.5 font-semibold disabled:opacity-50"
      >
        上一頁
      </button>
      <span aria-live="polite">第 {page} / {pageCount} 頁</span>
      <button
        type="button"
        disabled={page === pageCount}
        onClick={() => setPage(page + 1)}
        className="rounded-full bg-white px-3 py-1.5 font-semibold disabled:opacity-50"
      >
        下一頁
      </button>
    </nav>
  );
}
