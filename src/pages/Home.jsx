import "./Home.scss";

const fakePosts = [
  {
    id: 1,
    catName: "Whiskerstein",
    imageUrl: "https://cdn2.thecatapi.com/images/MTY3ODIyMQ.jpg",
    caption: "I don’t trust humans before coffee ☕",
    date: "2h ago",
  },
  {
    id: 2,
    catName: "MicioZilla",
    imageUrl:
      "https://wpcdn.web.wsu.edu/cahnrs/uploads/sites/4/cat2-1024x676.jpg",
    caption: "Today I will destroy the couch 🛋️",
    date: "5h ago",
  },
  {
    id: 3,
    catName: "QuickPaw",
    imageUrl: "https://cdn2.thecatapi.com/images/bpc.jpg",
    caption: "Caught the laser! (not really) 🔴",
    date: "1h ago",
  },
  {
    id: 4,
    catName: "Captain Meowgan",
    imageUrl:
      "https://t4.ftcdn.net/jpg/02/66/72/41/360_F_266724172_Iy8gdKgMa7XmrhYYxLCxyhx6J7070Pr8.jpg",
    caption: "The perfect box does exist 🎁",
    date: "6h ago",
  },
  {
    id: 5,
    catName: "Catvenger Jones",
    imageUrl: "https://cdn2.thecatapi.com/images/cn6.jpg",
    caption: "On a treasure hunt… in the kibble bag 🪙",
    date: "30m ago",
  },
  {
    id: 6,
    catName: "Meowtini",
    imageUrl: "https://cdn2.thecatapi.com/images/9bt.jpg",
    caption: "Shaken, not stirred 🍸",
    date: "7h ago",
  },
  {
    id: 7,
    catName: "Purrlock Holmes",
    imageUrl: "https://cdn2.thecatapi.com/images/6qi.jpg",
    caption: "Elementary, my dear hooman 🕵️‍♂️",
    date: "4h ago",
  },
  {
    id: 8,
    catName: "Nyanfredo",
    imageUrl: "https://cdn2.thecatapi.com/images/6iq.jpg",
    caption: "Oscar-worthy meow 🎬",
    date: "12h ago",
  },
  {
    id: 9,
    catName: "FelixByte",
    imageUrl: "https://cdn2.thecatapi.com/images/9oo.jpg",
    caption: "Installing cuddles... ███████░ 87%",
    date: "3h ago",
  },
  {
    id: 10,
    catName: "GingerPaws",
    imageUrl: "https://cdn2.thecatapi.com/images/3le.jpg",
    caption: "Only 17 hours of sleep today 😴",
    date: "1d ago",
  },
  {
    id: 11,
    catName: "QueenMew",
    imageUrl: "https://cdn2.thecatapi.com/images/d6o.jpg",
    caption: "Who’s the boss here? 🐾",
    date: "9h ago",
  },
  {
    id: 12,
    catName: "MuffinFur",
    imageUrl:
      "https://static.scientificamerican.com/sciam/cache/file/2AE14CDD-1265-470C-9B15F49024186C10_source.jpg?w=1200",
    caption: "Fresh out of bed 🍞",
    date: "2d ago",
  },
  {
    id: 13,
    catName: "PixelCat",
    imageUrl: "https://cdn2.thecatapi.com/images/3sb.jpg",
    caption: "Rendered in 8-bit 🎮",
    date: "6h ago",
  },
  {
    id: 14,
    catName: "BaffoChan",
    imageUrl: "https://cdn2.thecatapi.com/images/bo9.jpg",
    caption: "Part anime, part trouble 😼",
    date: "8h ago",
  },
  {
    id: 15,
    catName: "SpaghettiPaws",
    imageUrl: "https://cdn2.thecatapi.com/images/a5v.jpg",
    caption: "Oops… knocked over a vase 🌪️",
    date: "10m ago",
  },
  {
    id: 16,
    catName: "MicioFluff",
    imageUrl:
      "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg",
    caption: "I love napping in the sun ☀️",
    date: "2h ago",
  },
  {
    id: 17,
    catName: "WhiskersQueen",
    imageUrl:
      "https://media.4-paws.org/d/2/5/f/d25ff020556e4b5eae747c55576f3b50886c0b90/cut%20cat%20serhio%2002-1813x1811-720x719.jpg",
    caption: 'Motivational meow of the day: "Believe in yourself 🐾"',
    date: "4h ago",
  },
  {
    id: 18,
    catName: "SirNapALot",
    imageUrl:
      "https://www.communitycatspodcast.com/wp-content/uploads/2023/03/Cat6-800x800.jpg",
    caption: "The perfect box does exist 🎁",
    date: "6h ago",
  },
];

function Home() {
  return (
    <div className="home-container">
      <div className="feed">
        <h2 className="feed-title">FOR YOU</h2>
        {fakePosts.map((post) => (
          <div key={post.id} className="post-card">
            <img src={post.imageUrl} alt={`Foto di ${post.catName}`} />
            <div className="post-content">
              <h3>{post.catName}</h3>
              <p>{post.caption}</p>
              <span className="post-date">{post.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
