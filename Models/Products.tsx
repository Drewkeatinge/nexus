export interface Product {
  id:                     string;
  type:                   number;
  archived:               number;
  averageRating:          null;
  averageRatingNZ:        null;
  boxDepth:               number;
  boxHeight:              number;
  boxWeight:              number;
  boxWidth:               number;
  created:                Date;
  createdViaAPI:          null;
  deleted:                null;
  depth:                  number;
  disclaimer:             null;
  draftDateAU:            null;
  draftDateNZ:            null;
  ean:                    string;
  externalID:             null;
  externalIDNZ:           null;
  externalModified:       null;
  finish:                 string;
  heading:                string;
  height:                 number;
  heroStory:              null;
  modelNo:                string;
  modified:               Date;
  nprHeading:             null;
  nprModelNo:             string;
  oldLabelData:           null;
  productFeatures:        string;
  productFeaturesSummary: null;
  publishedAU:            null;
  publishedNZ:            null;
  shortDesc:              string;
  supersededBy:           null;
  supersededByNZ:         null;
  totalRatings:           null;
  totalRatingsNZ:         null;
  warranty:               string;
  webCopy:                null;
  webImageLimit:          number;
  weight:                 number;
  width:                  number;
  brand:                  Brand;
  defaultImage:           DefaultImage;
  defaultdisplaycategory: Brand;
  productbrochures:       unknown[];
  productdocuments:       DefaultImage[];
  productusermanuals:     unknown[];
  productwarranties:      unknown[];
  webDefaultImage:        DefaultImage;
  productImages:          DefaultImage[];
  draftstatus:            string;
  draftstatusNZ:          string;
  superseded:             number;
  supersededNZ:           number;
  categoryAttributesByID: { [key: string]: boolean | number | null | string };
  categoryAttributes:     CategoryAttributes;
  videos:                 unknown[];
  threeDimensionalVideos: unknown[];
  countries:              Brand[];
  countryOfOrigin:        null;
  isAUProduct:            boolean;
  isNZProduct:            boolean;
}

export interface Brand {
  id:         number;
  type:       string;
  name:       string;
  hierarchy?: string;
}

export interface CategoryAttributes {
  "No. Of Speeds":        number;
  "Lighting":               boolean;
  "Noise Level (dBA)":    number;
  "No. of Filters":       number;
  "Auto Off":             boolean;
  "No. of Fans":          null;
  "No. of Lights":        number;
  "Light Type":           string;
  "Recirculation Option": boolean;
  "Additional Features":  string;
}

export interface DefaultImage {
  id:       number;
  type:     string;
  created?: Date;
  deleted:  null;
  fileName: string;
}


export interface ProductSub {
  id:               string;
  type:             string;
  created:          Date;
  createdViaAPI:    null;
  ean:              string;
  externalModified: null;
  heading:          string;
  modelNo:          string;
  modified:         Date;
}

export interface UploadProduct {
  barcode: number;
  code: string;
  department: string;
  productgroup: string;
  subgroup: string;
  shortdesc: string;
  longdesc: string;
  sellingpoints: string;
  specifications: object;
  mancode: string;
  priceindex: string;
  unicode: string;
  warranty: string;
  showstock: string;
  damage: string;
  video: string;
  feature1: string;
  feature2: string;
  feature3: string;
  feature4: string;
  feature5: string;
  feature6: string;
  feature7: string;
  giftwrap: string;
  visible: string;
  forsale: string;
  metadesc: string;
  metakeywords: string;
}