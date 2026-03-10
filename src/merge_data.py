import pandas as pd
import glob 
import os

all_files = glob.glob("data/raw/**/*.csv",recursive = True)
print(f"Found {len(all_files)} files")
dfs = []
for filepath in all_files:
    df = pd.read_csv(filepath)
    dfs.append(df)
merged = pd.concat(dfs, ignore_index = True)
 
print(merged["label"].value_counts())
print(f"Total rows: {len(merged)}")

os.makedirs("data/merged", exist_ok = True)
merged.to_csv("data/merged/gesture_data_v1.csv",index = False)
print("Saved : data/merged/gesture_data_v1.csv")