CREATE TABLE admins(
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255) NOT NULL,
    canModifyUsers BOOLEAN NOT NULL,
    name VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE medias(
    uuid VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE events(
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    creatorID INT,
    lastModificatorID INT,
    FOREIGN KEY (creatorID) REFERENCES admins(id),
    FOREIGN KEY (lastModificatorID) REFERENCES admins(id)
);

CREATE TABLE includes(
    id INT PRIMARY KEY AUTO_INCREMENT,
    eventId INT,
    mediaId VARCHAR(255),
    FOREIGN KEY (eventId) REFERENCES events(id),
    FOREIGN KEY (mediaId) REFERENCES medias(id)
);

CREATE TABLE categories(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    description TEXT
);

CREATE TABLE eventsCategories(
    id INT PRIMARY KEY AUTO_INCREMENT,
    eventId INT,
    categoryId INT,
    FOREIGN KEY (eventId) REFERENCES events(id),
    FOREIGN KEY (categoryId) REFERENCES categories(id)
);