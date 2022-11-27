export type User = { email: string; password: string };

export type Animal = {
  denumire: string;
  denumireStiintifica: string;
  tip: "pasare" | "mamifer" | "nevertebrat";
};

export type Observatie = {
  latitudine: number;
  longitudine: number;
  animal: string;
  numar: string;
  data: Date;
  comportament:
    | "prezent"
    | "pereche cuibaritoare"
    | "adult cuibaritor"
    | "comportament nuptial"
    | "hranire"
    | "in zbor"
    | "cuib ocupat"
    | "odihna"
    | "vanatoare"
    | "mort pe sosea";
};

export type TripType = {
  titlu: string;
  descriere: string;
  observatii: Array<Observatie>;
};
