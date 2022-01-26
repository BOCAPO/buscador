FROM python:3

WORKDIR /app

ENV FLASK_APP=api.py

ENV FLASK_ENV=development

COPY ./requirements.txt .

RUN pip install -r requirements.txt&&pip install pysolr

COPY . .

CMD [ "python", "api.py" ]

