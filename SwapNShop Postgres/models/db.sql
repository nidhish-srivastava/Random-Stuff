CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  dp VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
);

CREATE TABLE commonpostproperty(
    id SERIAL PRIMARY KEY,
    description TEXT NOT NULL,
    title VARCHAR(255) NOT NULL,
    price NUMERIC NOT NULL,
    images VARCHAR(255)[],
    username VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    location_state VARCHAR(255) NOT NULL,
    location_district VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE realestate (
        id SERIAL PRIMARY KEY REFERENCES common_properties(id),
        type VARCHAR(255) NOT NULL,
        bedrooms VARCHAR NOT NULL,
        bathrooms VARCHAR NOT NULL,
        furnishing VARCHAR(255) NOT NULL,
        construction_status VARCHAR(255) NOT NULL,
        listed_by VARCHAR(255) NOT NULL,
        super_built_up_area NUMERIC NOT NULL,
        carpet_area NUMERIC NOT NULL,
        maintenance NUMERIC NOT NULL,
        total_floors INTEGER NOT NULL,
        floor_no INTEGER NOT NULL,
        car_parking VARCHAR NOT NULL,
        facing VARCHAR(255) NOT NULL,
        project_name VARCHAR(255) NOT NULL
);
CREATE TABLE bikes(
        id SERIAL PRIMARY KEY REFERENCES commonpostproperty(id),
        brand VARCHAR(255) NOT NULL,
        year VARCHAR(255) NOT NULL,
        km_driven INTEGER NOT NULL
        );

CREATE TABLE cars(
  id SERIAL PRIMARY KEY REFERENCES commonpostproperty(id),
  year INTEGER NOT NULL,
  km_driven INTEGER NOT NULL,
  );

      CREATE TABLE mobiles(
        id SERIAL PRIMARY KEY REFERENCES commonpostproperty(id),
        brand VARCHAR(255) NOT NULL
      );