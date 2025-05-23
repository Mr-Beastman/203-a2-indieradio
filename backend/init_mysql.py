import mysql.connector
from mysql.connector import Error
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

def init_mysql():
    connection = None
    try:
        # Connect to MySQL server (without selecting a database)
        connection = mysql.connector.connect(
            host=os.getenv('DB_HOST', 'localhost'),
            user=os.getenv('DB_USER', 'root'),
            password=os.getenv('DB_PASSWORD')
        )
        
        if connection.is_connected():
            cursor = connection.cursor()
            
            # Create database if it doesn't exist
            db_name = os.getenv('DB_NAME', 'indieradio')
            cursor.execute(f"CREATE DATABASE IF NOT EXISTS {db_name}")
            print(f"Database '{db_name}' created successfully")
            
            # Switch to the created database
            cursor.execute(f"USE {db_name}")
            
            # Create tables (this will be handled by Flask-SQLAlchemy migrations)
            print("Database initialized. You can now run Flask-Migrate to create tables.")

    except Error as e:
        print(f"Error while connecting to MySQL: {e}")
    finally:
        if connection and connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL connection closed.")

if __name__ == "__main__":
    init_mysql()
