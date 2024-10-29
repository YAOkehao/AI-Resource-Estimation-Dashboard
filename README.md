# AI-Resource-Estimation-Dashboard

1. Navigate to the backend directory, open the console, and enter `pip3 install -r requirements.txt` to install all necessary dependencies for the backend.

2. For the initial run, you’ll need to initialize the database. Go to `/backend/util/run.py`, remove the `#` from `# db.init_db()` and save the file. This will initialize the database.

3. Navigate to the frontend directory, open the console, and run `npm install`.

4. Now that you have the console open for both frontend and backend, start by entering `python3 run.py` in the backend console to start the backend.

5. Then, return to the frontend console and enter `npm run dev` to start the frontend.

6. During testing, we encountered some unpredictable bugs. For example, when using Google Chrome, all text on the frontend page might turn gray. The cause is unknown, but switching to another browser allows the text to display correctly!