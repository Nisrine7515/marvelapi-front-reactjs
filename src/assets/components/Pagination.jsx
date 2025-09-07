function Pagination({ page, setPage, totalPages }) {
  function prev() {
    if (page > 1) setPage(page - 1);
  }

  function next() {
    if (!totalPages || page < totalPages) setPage(page + 1);
  }

  return (
    <div>
      <button onClick={prev} disabled={page === 1}>
        Précédent
      </button>
      <span>
        Page {page}
        {totalPages ? ` / ${totalPages}` : ""}
      </span>
      <button onClick={next} disabled={totalPages ? page >= totalPages : false}>
        Suivant
      </button>
    </div>
  );
}

export default Pagination;
