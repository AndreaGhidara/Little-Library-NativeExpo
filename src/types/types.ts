interface Author {
    key: string;
}

interface AuthorType {
    key: string;
}

interface AuthorEntry {
    author: Author;
    type: AuthorType;
}

interface DateTime {
    type: string;
    value: string;
}

interface Work {
    authors: AuthorEntry[];
    covers: number[];
    created: DateTime;
    key: string;
    last_modified: DateTime;
    latest_revision: number;
    revision: number;
    title: string;
    type: {
        key: string;
    };
}

interface BookData {
    covers: string[];
    id: string;
    cover: string[]
    already_read_count: number;
    author_alternative_name: string[];
    author_facet: string[];
    author_key: string[];
    author_name: string[];
    cover_edition_key: string;
    cover_i: number;
    currently_reading_count: number;
    ebook_access: string;
    ebook_count_i: number;
    edition_count: number;
    edition_key: string[];
    first_publish_year: number;
    format: string[];
    has_fulltext: boolean;
    isbn: string[];
    key: string;
    last_modified_i: number;
    number_of_pages_median: number;
    public_scan_b: boolean;
    publish_date: string[];
    publish_year: number[];
    publisher: string[];
    publisher_facet: string[];
    readinglog_count: number;
    seed: string[];
    title: string;
    title_sort: string;
    title_suggest: string;
    type: string;
    want_to_read_count: number;
    _version_: number;
}

export { Author, AuthorType, AuthorEntry, DateTime, Work, BookData };
