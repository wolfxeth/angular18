export class Movies {
    _id: string;
    plot: string;
    genres: string[];
    runtime: number;
    cast: string[];
    poster: string;
    title: string;
    fullplot: string;
    languages: string[];
    released: Date;
    directors: string[];
    rated: string;
    awards: Awards | null;
    lastupdated: string;
    year: string;
    imdb: Imdb | null;
    countries: string[];
    type: string;
    tomatoes: Tomatoes | null;
    numMflixComments: number;
  
    constructor(data: any) {
      this._id = data._id;
      this.plot = data.plot;
      this.genres = data.genres || [];
      this.runtime = data.runtime;
      this.cast = data.cast || [];
      this.poster = data.poster;
      this.title = data.title;
      this.fullplot = data.fullplot;
      this.languages = data.languages || [];
      this.released = new Date(data.released);
      this.directors = data.directors || [];
      this.rated = data.rated;
      this.awards = data.awards ? new Awards(data.awards) : null;
      this.lastupdated = data.lastupdated;
      this.year = data.year;
      this.imdb = data.imdb ? new Imdb(data.imdb) : null;
      this.countries = data.countries || [];
      this.type = data.type;
      this.tomatoes = data.tomatoes ? new Tomatoes(data.tomatoes) : null;
      this.numMflixComments = data.numMflixComments;
    }
  }
  
  export class Awards {
    wins: number;
    nominations: number;
    text: string;
  
    constructor(data: any) {
      this.wins = data.wins;
      this.nominations = data.nominations;
      this.text = data.text;
    }
  }
  
  export class Imdb {
    rating: number;
    votes: number;
    id: number;
  
    constructor(data: any) {
      this.rating = data.rating;
      this.votes = data.votes;
      this.id = data.id;
    }
  }
  
  export class Tomatoes {
    viewer: Viewer |null;
    fresh: number;
    critic: Critic | null;
    rotten: number;
    lastUpdated: Date;
  
    constructor(data: any) {
      this.viewer = data.viewer ? new Viewer(data.viewer) : null;
      this.fresh = data.fresh;
      this.critic = data.critic ? new Critic(data.critic) : null;
      this.rotten = data.rotten;
      this.lastUpdated = new Date(data.lastUpdated);
    }
  }
  
  export class Viewer {
    rating: number;
    numReviews: number;
    meter: number;
  
    constructor(data: any) {
      this.rating = data.rating;
      this.numReviews = data.numReviews;
      this.meter = data.meter;
    }
  }
  
  export class Critic {
    rating: number;
    numReviews: number;
    meter: number;
  
    constructor(data: any) {
      this.rating = data.rating;
      this.numReviews = data.numReviews;
      this.meter = data.meter;
    }
  }
  