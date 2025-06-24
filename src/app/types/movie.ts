export interface Movie {
    characters: string[];
    starships: string[];
    vehicles: string[];
    title: string;
    opening_crawl: string;
    director: string;
}

export type MovieProps = Exclude<keyof Movie, 'title' | 'opening_crawl' | 'director'>