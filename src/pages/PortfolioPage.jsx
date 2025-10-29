import '../css/PortfolioPage.css';

export default function PortfolioPage() {
  const posts = [
    {
      title: "CM Fixed Income: Exiting Banking & PSU to Add a New Gilt Fund",
      date: "May 26, 2023",
      summary: "Discusses changes in the Capitalmind Fixed Income portfolio.",
    },
    {
      title: "Craftsman Automation: Poised for Growth Amid Temporary Headwinds",
      date: "May 24, 2023",
      summary: "An analysis of Craftsman Automation's performance and prospects.",
    },
    {
      title: "The Focused Way of Investing: Our Four-Quadrant Strategy and FY24 Review",
      date: "May 19, 2023",
      summary: "Reviews Capitalmind's investing strategy and performance.",
    },
    {
      title: "A Small Glib for India, Yet Again",
      date: "May 17, 2023",
      summary: "Commentary on India's economic situation.",
    },
    {
      title: "Poonawalla Fincorp: One right step at a time",
      date: "May 16, 2023",
      summary: "Analysis of Poonawalla Fincorp's strategic moves.",
    },
    {
      title: "CM Focused: Reducing our allocation to smallcaps & increasing allocation to financials",
      date: "May 12, 2023",
      summary: "Discusses changes in the Capitalmind Focused portfolio.",
    },
     {
      title: "Poonawalla Fincorp: One right step at a time",
      date: "May 16, 2023",
      summary: "Analysis of Poonawalla Fincorp's strategic moves.",
    },
    {
      title: "CM Focused: Reducing our allocation to smallcaps & increasing allocation to financials",
      date: "May 12, 2023",
      summary: "Discusses changes in the Capitalmind Focused portfolio.",
    },
  ];

  return (
    <div className="portfolio">
      <h1>Latest Posts</h1>
      <div className="posts">
        {posts.map((post, index) => (
          <div key={index} className="post">
            <h3>{post.title}</h3>
            <p className="date">{post.date}</p>
            <p>{post.summary}</p>
            <a href="#">Read full post</a>
          </div>
        ))}
      </div>
    </div>
  );
}
