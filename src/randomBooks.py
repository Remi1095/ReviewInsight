from faker import Faker
import datetime
import argparse
import numpy
import random
import json
import os
import sys

fake = Faker()

def randomData(num_authors):
    books = []
    values = {
        'genres': [
            "Sci-Fi",
            "Fantasy",
            "Mystery",
            "Romance",
            "Thriller",
            "Horror",
            "Comedy",
            "Dystopia",
            "Biography",
            "History",
            "Science",
            "Finance",
            "Psychology",
            "Philosophy",
            "Politics",
            "Art"
        ],
        'classifications': [
            'General', 
            'Teen',
            'Mature',
            'Explicit'
        ]
    }
        
    id = 0

    for i in range(num_authors):
        author = fake.name(),
        for j in range(random.randint(1,5)):
            
            volumes = random.randint(0, 4)
            series = {
                'series': randomSeries() if volumes != 0 else None,
                'author': author,
                'language': randomLanguage(),
                'genres': randomGenres(),
                'publisher': fake.company(),
                'classification': random.choice(values['classifications'])
            }

            if volumes == 0:
                book = createBook(series, id, None, randomDate())
                books.append(book)
                id += 1
            else:
                dates = [randomDate() for _ in range(volumes)]
                dates.sort()
                for v in range(volumes):
                    book = createBook(series, id, v+1, dates[v])
                    books.append(book)
                    id += 1

    data = {
        'books': books,
        'values': values
    }

    return json.dumps(data, indent=2)


def createBook(series, id, volume, date):
    mean = random.random()* (9.5 - 3.5) + 3.5
    std_dev = random.random()* (2 - 0.5) + 0.5
    book = {
        'id': id,
        'title': randomTitle(),
        'series': series['series'],
        'volume': volume,
        'author': series['author'],
        'words': random.randint(10000, 500000),
        'language': series['language'],
        'published': date,
        'publisher': series['publisher'],
        'classification': series['classification'],
        'genres': series['genres'],
        'description': randomDescription(random.randint(1,5)),
        'cover': 'book-cover-placeholder.png',
        'fakeCover': randomFakeCover(series['genres'][0]),
        'scores': randomScores(random.randint(1,100), mean, std_dev),
        'reviews': randomReviews(date, mean, std_dev)
    }
    return book

def randomSeries():
    words = ""
    for i in range(random.randint(1, 2)):
        words += fake.word().title() + ' '
    words += fake.word().title()
    return words

def randomTitle():
    words = ""
    for i in range(random.randint(2, 5)):
        words += fake.word().title() + ' '
    words += fake.word().title()
    return words


def randomLanguage():
    languages = ['English', 'Spanish', 'French']
    weights = [0.8, 0.1, 0.1]
    return random.choices(languages, weights)[0]

def randomGenres():
    genres = {
        "Fiction": [
            "Sci-Fi",
            "Fantasy",
            "Mystery",
            "Romance",
            "Thriller",
            "Horror",
            "Comedy",
            "Dystopia"
        ],
        "Non-Fiction": [
            "Biography",
            "History",
            "Science",
            "Finance",
            "Psychology",
            "Philosophy",
            "Politics",
            "Art"
        ]
    }
    
    category = random.choice(list(genres.keys()))
    genres = random.sample(genres[category], k=random.randint(1, 4))
    genres.append(category)
    return genres

def randomDate(start_date="1970-01-01"):
    start_date = datetime.datetime.strptime(start_date, "%Y-%m-%d")
    end_date = datetime.datetime.now()
    random_date = start_date + datetime.timedelta(seconds=random.randint(0, int((end_date - start_date).total_seconds())))
    return random_date.strftime("%Y-%m-%d")

def randomDescription(num_paragraphs):
    description = ""
    for i in range(num_paragraphs-1):
        description += fake.paragraph(8)+"\n\n"
    description += fake.paragraph(8)
    return description

def randomScores(num_scores, mean, std_dev):
    return [round(min(max(numpy.random.normal(mean, std_dev), 1), 10)) for _ in range(num_scores)]

def randomReviews(book_date, mean, std_dev):
    num_reviews = random.randint(1, 50)
    scores = randomScores(num_reviews, mean, std_dev)
    reviews = []
    for i in range(num_reviews):
        review = {
            'name': fake.user_name(),
            'date': randomDate(book_date),
            'score': scores[i],
            'review': randomDescription(random.randint(1,3)),
            'spoiler': random.choice([True, False])
        }
        reviews.append(review)
    return reviews

def randomFakeCover(genre):
    genreIcons = {
    'Sci-Fi': 'rocket',
    'Fantasy': 'dragon',
    'Mystery': 'puzzle-piece',
    'Romance': 'heart',
    'Thriller': 'person-running',
    'Horror': 'skull',
    'Comedy': 'masks-theater',
    'Dystopia': 'xmarks-lines',
    'Biography': 'book-open-reader',
    'History': 'landmark',
    'Science': 'flask',
    'Finance': 'sack-dollar',
    'Psychology': 'brain',
    'Philosophy': 'infinity',
    'Politics': 'handshake-simple',
    'Art': 'palette'
}
    colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'black', 'darkgray', 'gray', 'lightgray', 'white']

    twoColors = random.sample(colors, 2)
    
    fakeCover = {
        "bgColor": twoColors[0],
        "iconColor": twoColors[1],
        "icon": genreIcons[genre]
    }
    return fakeCover


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Generate random book data')
    parser.add_argument('num_authors', type=int, help='number of authors to generate')
    args = parser.parse_args()

    randomData = randomData(args.num_authors)


    file_path = f'{os.path.dirname(os.path.abspath(sys.argv[0]))}/data.json'

    with open(file_path, 'w') as file:  # Use 'w' mode to overwrite the file
        file.write(randomData)

    print(f'Data written to {file_path}')
