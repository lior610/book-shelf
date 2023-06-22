# Use the official Python base image
FROM python:3.9-slim-buster

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install the Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code into the container
COPY . .

# Expose the port on which the Flask app will run (default is 5000)
EXPOSE 5000

# Set the environment variable for Flask
ENV FLASK_APP=form.py

# Run the Flask application
CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]
