# Use the official Python image as the base image
FROM python:3.10-slim

# Set the working directory in the container
WORKDIR /app

# Install dependencies for Chrome and ChromeDriver
RUN apt-get update && apt-get install -y \
    wget \
    curl \
    unzip \
    xvfb \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libnss3 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libgbm-dev \
    libgtk-3-0 \
    xdg-utils \
    && apt-get clean && rm -rf /var/lib/apt/lists/*


# Install the Python dependencies
COPY src/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Install Gunicorn
RUN pip install --no-cache-dir gunicorn

# Copy the rest of the application code into the container
COPY . .

# Expose the port on which the Flask app runs
EXPOSE 8080

# Set the environment variable for Flask
ENV FLASK_APP=src/main.py

# Set display port for Xvfb
ENV DISPLAY=:99

# Command to run the Flask app
CMD ["gunicorn", "-w", "1", "-b", "0.0.0.0:8080", "app:app"]