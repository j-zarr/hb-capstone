"""Script to seed database."""

from random import choice
import hashlib
import os

import crud_a
import crud_p
import crud_u
import model
import server

os.system("dropdb artworks")
os.system("createdb artworks")

model.connect_to_db(server.app)
model.db.create_all()

p_ids = [1, 2, 3, 4, 5]

# Create a user

hashed = hashlib.sha256('password'.encode()).hexdigest()

user = crud_u.create_user(username="smelly cat",
                          email="user1@gmail.com",
                          password=hashed)

model.db.session.add(user)
model.db.session.commit()


# Create portfolios
portfolio_titles = ["pivot!",
                    "monana",
                    "moo",
                    "how you doin",
                    "lobster"]

for title in portfolio_titles:
    p = crud_p.create_portfolio(user_id=user.user_id,
                                p_title=title)
    model.db.session.add(p)
model.db.session.commit()


# Create artworks
artworks = {
    'spoon n jam':
    'https://artworks-images.s3.amazonaws.com/1/01c6a60add604431872dd49c164de669-spoon-n-jam.png',
    'football':
    'https://artworks-images.s3.amazonaws.com/1/028ec56c59054ac2ac51e3d0f83cad6d-football.png',
    'Hammock':
    'https://artworks-images.s3.amazonaws.com/1/1af7b1fc3f914d88b83fba35de9bc0b7-hammock.png',
    'dino':
    'https://artworks-images.s3.amazonaws.com/1/3890f77d6c7d4db89136e8e3eb662133-Dino.png',
    'turkey trot':
    'https://artworks-images.s3.amazonaws.com/1/449a10b473e84063803c65dc4f3b2414-turkey-trot.png',
    'Banana':
    'https://artworks-images.s3.amazonaws.com/1/751a11858c6b47c5af6c8a4f1c1e9b90-banana.png',
    'day of fun':
    'https://artworks-images.s3.amazonaws.com/1/8cf971050a5f4e77af145259186e1e85-day-of-fun.png',
    'Marcel':
    'https://artworks-images.s3.amazonaws.com/1/aacc0b0aa9ed49329faf554f6d28ce5a-Marcel.png',
    'vacuum':
    'https://artworks-images.s3.amazonaws.com/1/d2ec5cf2986940f28360db45f7b02aee-vacuum.png',
    'on a break':
    'https://artworks-images.s3.amazonaws.com/1/d857596d17b9453283d568cca417a21c-on-a-break.png',
    'Princess Consuela':
    'https://artworks-images.s3.amazonaws.com/1/f22cf7bb00cf41248c697797b4fe41b0-princess-consuela.png',
}

for title, path in artworks.items():
    id = choice(p_ids)
    a = crud_a.create_artwork(portfolio_id=id,
                              a_title=title,
                              file_path=path
                              )
    model.db.session.add(a)
model.db.session.commit()
