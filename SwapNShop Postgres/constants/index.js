const PROJECT_NAME = "SwapNShop"

const propertyCategoryFields = [
    {
      label: "Type",
      buttons: [{selected:false,btn : "Apartments"}, {selected:false,btn : "Build Floors"}, {selected:false,btn : "Farm Houses"}, {selected:false,btn : "Houses and Villas"}],
    },
    {
      label:"Bedrooms",
      buttons : [{selected:false,btn : 1},{selected:false,btn : 2},{selected:false,btn : 3},{selected:false,btn : 4},{selected:false,btn : "4+"}],
    },
    {
      label : "Bathrooms",
      buttons : [{selected:false,btn : 1},{selected:false,btn : 2},{selected:false,btn : 3},{selected:false,btn : 4},{selected:false,btn : "4+"}],
    },
    {
      label : "Furnishing",
      buttons : [{selected:false,btn : "Furnished"},{selected:false,btn : "Semi Furnished"},{selected:false,btn:"Unfurnished"}],
    },
    {
      label : "Construction Status",
      buttons : [{selected:false,btn : "New Launch"},{selected:false,btn : "Ready to move"},{selected:false,btn : "Under Construction"}],
    },
    {
      label : "Listed By",
      buttons : [{selected:false,btn : "Builder"},{selected:false,btn : "Dealer"},{selected:false,btn : "Owner"}],
    },
    {
      label:  "Car Parking",
      buttons : [{selected:false,btn : 0},{selected:false,btn : 1},{selected:false,btn : 2},{selected:false,btn : 3},{selected:false,btn : "3+"}],
    },
  ];
  
  
  
 const dropdownArrayCategoryItems = [
    {
      label: "Mobile",
      options: [
        "IPhone",
        "Samsung",
        "Redmi",
        "Realme",
        "One Plus",
        "Oppo",
        "Google Pixel",
        "Asus",
        "Sony",
      ],
    },
    {
      label: "Facing",
      options: [
        "East",
        "West",
        "North",
        "South",
        "North-East",
        "North-West",
        "South-East",
        "South-West",
      ],
    },
  ];

 export {
PROJECT_NAME,dropdownArrayCategoryItems,propertyCategoryFields
 } 