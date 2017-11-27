import pandas as pd
# df = pd.read_csv("avg_county.csv", header = 0)
import numpy as np
# print df.head(5)
# df_co = df[df.Pollutant == "SO2"]
# # df_co.to_scv("avg_county_CO.csv", sep='\t', encoding='utf-8')

# # with open("avg_county_CO.csv", 'a') as f:
# #     df_co.to_csv(f)

# with open("avg_county_SO2.csv", 'a') as f:
#     df_co.to_csv(f)

df = pd.read_csv("season_county.csv", header = 0)
print df.head(5)

df1 = df[df.Season == 1]
df1 = df1[df1.Pollutant == "SO2"]
with open("SO2_season1.csv", 'a') as f:
    df1.to_csv(f)





