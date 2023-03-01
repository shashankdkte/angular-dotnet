namespace API.Helpers
{
    public class PaginationHeader
    {
        public PaginationHeader(int currentPage, int itemsPerPage, int totalItems, int totalPages)
        {
            this.CurrentPage = currentPage;
            this.ItemsperPage = itemsPerPage;
            this.TotalItems = totalItems;
            this.TotalPages = totalPages;
        }

        public int CurrentPage { get; set; }
        public int ItemsperPage { get; set; }
        public int TotalItems { get; set; }
        public int TotalPages { get; set; }
    }
}
