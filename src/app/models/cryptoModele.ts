// export interface Crypto {

export interface Crypto {
    Message: string;
    Type: number;
    SponsoredData: any[];
    Data: Datum[];
    RateLimit: RateLimit;
    HasWarning: boolean;
}

// tslint:disable-next-line:no-empty-interface
interface RateLimit {
}

interface Datum {
    hight: any;
    low: any;
    time: any;
    CoinInfo: CoinInfo;
    RAW: RAW;
    DISPLAY: DISPLAY;
}

interface DISPLAY {
    USD: USD2;
}

interface USD2 {
    FROMSYMBOL: string;
    TOSYMBOL: string;
    MARKET: string;
    PRICE: string;
    LASTUPDATE: string;
    LASTVOLUME: string;
    LASTVOLUMETO: string;
    LASTTRADEID: string;
    VOLUMEDAY: string;
    VOLUMEDAYTO: string;
    VOLUME24HOUR: string;
    VOLUME24HOURTO: string;
    OPENDAY: string;
    HIGHDAY: string;
    LOWDAY: string;
    OPEN24HOUR: string;
    HIGH24HOUR: string;
    LOW24HOUR: string;
    LASTMARKET: string;
    VOLUMEHOUR: string;
    VOLUMEHOURTO: string;
    OPENHOUR: string;
    HIGHHOUR: string;
    LOWHOUR: string;
    CHANGE24HOUR: string;
    CHANGEPCT24HOUR: string;
    CHANGEDAY: string;
    CHANGEPCTDAY: string;
    SUPPLY: string;
    MKTCAP: string;
    TOTALVOLUME24H: string;
    TOTALVOLUME24HTO: string;
    IMAGEURL: string;
}

interface RAW {
    USD: USD;
}

interface USD {
    TYPE: string;
    MARKET: string;
    FROMSYMBOL: string;
    TOSYMBOL: string;
    FLAGS: string;
    PRICE: number;
    LASTUPDATE: number;
    LASTVOLUME: number;
    LASTVOLUMETO: number;
    LASTTRADEID: string;
    VOLUMEDAY: number;
    VOLUMEDAYTO: number;
    VOLUME24HOUR: number;
    VOLUME24HOURTO: number;
    OPENDAY: number;
    HIGHDAY: number;
    LOWDAY: number;
    OPEN24HOUR: number;
    HIGH24HOUR: number;
    LOW24HOUR: number;
    LASTMARKET: string;
    VOLUMEHOUR: number;
    VOLUMEHOURTO: number;
    OPENHOUR: number;
    HIGHHOUR: number;
    LOWHOUR: number;
    CHANGE24HOUR: number;
    CHANGEPCT24HOUR: number;
    CHANGEDAY: number;
    CHANGEPCTDAY: number;
    SUPPLY: number;
    MKTCAP: number;
    TOTALVOLUME24H: number;
    TOTALVOLUME24HTO: number;
    IMAGEURL: string;
}

interface CoinInfo {
    Id: string;
    Name: string;
    FullName: string;
    Internal: string;
    ImageUrl: string;
    Url: string;
    Algorithm: string;
    ProofType: string;
    NetHashesPerSecond: number;
    BlockNumber: number;
    BlockTime: number;
    BlockReward: number;
    Type: number;
    DocumentType: string;
}
