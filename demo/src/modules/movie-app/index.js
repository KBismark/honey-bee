//<@imports>

//import HoneyBee from '../../../../lib/index'; // Uncomment this line to enable code completion

//</>

const { UI } = HoneyBee; // HoneyBee is used as `standalone`
const pagelocker = {};
// Lock app creation before exporting
UI.lockPageCreation(pagelocker);

// Creates Movies component class using object
const Movies = UI.CreateComponentFromObject('movie',
  {
  onCreation(args) {
    this.movieData = args;
  },
  onMount() {
    this.movieData = undefined;
  },
  getClass() {
    return this.movieData.vote_average>=8?'green':this.movieData.vote_average>=5?'orange':'red'
  },
  data : {
    IMG_PATH: 'https://image.tmdb.org/t/p/w1280'
  },
  view(args) {
    return (
      <view>
        <div class="movie">
          <img src={this.data.IMG_PATH + this.movieData.poster_path} alt={this.movieData.title} />
          <div class="movie-info">
            <h3><>{args.title}</></h3>
            <span class={this.getClass()}> <>{args.vote_average}</> </span>
          </div>
          <div class="overview">
            <h3>Overview</h3>
            <>{args.overview}</>
          </div>
        </div>
      </view>
    );
  }
 
});

const PageInstance = UI.CreateComponent('page', function () {
    
  this.onCreation = function () {
    this.state = {
      movieList: UI.CreateList([]),
      movies:[]
    }
    this.movies = [];
    this.getandUpdateMovies(this.data.API_URL);
  }

  this.data = {
    API_URL: 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1',
    SEARCH_API: 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'
  };
  this.getandUpdateMovies = async function (url) {
    const res = await fetch(url);
    const data = await res.json();
    const listSize = this.state.movieList.size();
    if (listSize) {
      this.state.movieList.remove(0);
    };

    this.state.movieList.insertBefore(
      0,
      data.results.map((e)=>Movies.instance()),
      {
        data: data.results,
        handler: function (item, index, movies) {
          UI.render(item,movies[index])
        }
      }
    )
  }

    return (
      <view>
          <div id="page" class="page">
            <style><>{style}</></style>
            <header>
              <form id="form" onSubmit={ async function (e,This) {
                  e.preventDefault();
                  const searchTerm = This.searchValue;
                  if (searchTerm && /[^ ]/.test(searchTerm)) {
                    This.getandUpdateMovies(This.data.SEARCH_API + searchTerm);
                   }
                }}>
                  <input type="text" id="search" class="search" placeholder="Search" onKeyup={function(e,This){This.searchValue = this.value}} />
              </form>
            </header>

            <main id="main">
            <>
              {
               state.movieList
              }
            </>
            </main>
          </div>
      </view>
    )
}).instance();

export default PageInstance;

const style =
  `@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;400&display=swap');

    :root {
      --primary-color: #22254b;
      --secondary-color: #373b69;
    }
    
    * {
      box-sizing: border-box;
    }
    
    body {
      background-color: var(--primary-color);
      font-family: 'Poppins', sans-serif;
      margin: 0;
    }
    
    header {
      padding: 1rem;
      display: flex;
      justify-content: flex-end;
      background-color: var(--secondary-color);
    }
    
    .search {
      background-color: transparent;
      border: 2px solid var(--primary-color);
      border-radius: 50px;
      font-family: inherit;
      font-size: 1rem;
      padding: 0.5rem 1rem;
      color: #fff;
    }
    
    .search::placeholder {
      color: #7378c5;
    }
    
    .search:focus {
      outline: none;
      background-color: var(--primary-color);
    }
    
    main {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
    
    .movie {
      width: 300px;
      margin: 1rem;
      background-color: var(--secondary-color);
      box-shadow: 0 4px 5px rgba(0, 0, 0, 0.2);
      position: relative;
      overflow: hidden;
      border-radius: 3px;
    }
    
    .movie img {
      width: 100%;
    }
    
    .movie-info {
      color: #eee;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap:0.2rem;
      padding: 0.5rem 1rem 1rem;
      letter-spacing: 0.5px;
    }
    
    .movie-info h3 {
      margin-top: 0;
    }
    
    .movie-info span {
      background-color: var(--primary-color);
      padding: 0.25rem 0.5rem;
      border-radius: 3px;
      font-weight: bold;
    }
    
    .movie-info span.green {
      color: lightgreen;
    }
    
    .movie-info span.orange {
      color: orange;
    }
    
    .movie-info span.red {
      color: red;
    }
    
    .overview {
      background-color: #fff;
      padding: 2rem;
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      max-height: 100%;
      transform: translateY(101%);
      overflow-y: auto;
      transition: transform 0.3s ease-in;
    }
    
    .movie:hover .overview {
      transform: translateY(0);
    }`;

// Unlock app creation and create page
UI.unlockPageCreation(pagelocker)
UI.CreatePage(typeof document != 'undefined' ? location.pathname : '', PageInstance);