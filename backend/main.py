from fastapi import FastAPI

app = FastAPI(title="DSA Visualizer API")

@app.get("/")
async def root():
    return {"message": "Welcome to the DSA Visualizer API"}
