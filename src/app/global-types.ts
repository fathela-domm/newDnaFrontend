export type DailyReadingsContent = {
    massId?: string;
    readingBody?: string;
    readingTitle?: string;
    readingSource?: string;
    readingAddress?: string;
}

export interface SocialShareLink {
    outlet: string;
    href: string;
    label: string;
    icon: string;
}

export type MysteriesOfTheRosaryIntro = {
    pope: string;
    message: string;
}

// The Rosary
export type Mysteries = {
    no: number;
    mystery: string;
    verse: string;
    meditation: string;
    prayer: string;
}

export interface MysteriesOfTheRosary {
    name: string;
    description: string;
    days: string;
    intro: MysteriesOfTheRosaryIntro[]
    mysteries: Mysteries[];
}

export interface SorrowsOfMary {
    sword: string;
    verse: string;
    prayer: string;
}

export type RosaryPrayer = {
    title: string;
    content: string;
    description: string;
}

export type FAQ = {
    question: string;
    answer: string;
}

export type HowToPrayTheRosary = {
    no: number;
    step: string;
    prayer: string;
}

/**
 * The seven sorrow divine mercy and the rosary will all be of this type 
 */
export interface Rosary {
    name: string;
    timeNeeded: string;
    origin: string;
    wordFromPopeFrancis: string;
    howToPray: HowToPrayTheRosary[];
    prayers?: RosaryPrayer[];
    faqs: FAQ[];
}

export type CatholicPrayersContent = {
    title: string;
    intro: string;
    prayer: string;
}

/**
 * Other prayers will all be of this type
 */
export type CatholicPrayers = {
    category: string;
    intro: string;
    prayers: CatholicPrayersContent[];
}

export type BibleVerse = {
    no: number;
    verse: string;
}

export type BibleChapter = {
    no: number;
    book: string;
    verses: BibleVerse[]
}

export interface BibleBook {
    no: number;
    book: string;
    testament: string;
    chapters: BibleChapter[];
}

// external scripts
export interface Scripts {
    name: string;
    src: string;
}

type CatholicNewsDescriptionContent = {
    [paragraph: string]: string;
}

type CatholicNewsDescription = {
    header: string;
    info: string;
    guid: string;
    datePublished: string;
    content: CatholicNewsDescriptionContent;
}

export interface CatholicNews {
    title: string;
    category: string;
    imageURL: string;
    link: string;
    description: CatholicNewsDescription;
}

export interface CatholicNewsFeed {
    label: string;
    region: string;
}

export interface User {
    username?: string;
    email: string;
}