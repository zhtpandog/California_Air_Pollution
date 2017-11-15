import csv
import json
import collections
from collections import defaultdict
import xlsxwriter
dic = defaultdict(lambda : [0, 0])
with open('data.csv', 'rb') as f:
    reader = csv.reader(f)
    for row in list(reader)[1:]:
        if row[0] == 'NO2':
            key = (row[0], row[1], row[2]) # pollutant, lat, lon
            # dic[key] = [0, 0] # value, count 
            dic[key][0] += float(row[5])
            dic[key][1] += 1
dics = {}
for key in dic:
    dics[key] = dic[key][0]/ dic[key][1]


workbook = xlsxwriter.Workbook('NO2.xlsx')
worksheet = workbook.add_worksheet()


worksheet.write(0, 0, "Pollutant")
worksheet.write(0, 1, "Latitude")
worksheet.write(0, 2, "Lontitude")
worksheet.write(0, 3, "Average")
row = 1
# col = 0
for key in dics.keys():
    col = 0
    # for k in key:
    #     worksheet.write(row, col, k)
    for k in key:
        worksheet.write(row, col, k)
        col += 1
    worksheet.write(row, col, dics[key])
    row += 1

workbook.close()
print dics
# with open('NO2.csv', 'rb') as f:
#     reader = csv.reader(f)
#     for temp in list(reader)[1:]:
#         if temp[0] == '06':
#             site = str(temp[2])
#             if site in ['1025', '0005', '0011', '0002', '1022', '4003', '0004', '2004', '1004', '1002', '1001']:
#                 if not 'NO2' in data[site]:
#                     co = collections.OrderedDict()
#                     date = temp[9]
#                     hourly = collections.OrderedDict()
#                     hourly[temp[10]] = temp[13]
#                     co[date] = hourly
#                     data[site]['NO2'] = co
#                 else:
#                     date = temp[9]
#                     co = data[site]['NO2']
#                     if not date in co:
#                         hourly = collections.OrderedDict()
#                         hourly[temp[10]] = temp[13]
#                         co[date] = hourly
#                     else:
#                         co[date][temp[10]] = temp[13]

# with open('SO2.csv', 'rb') as f:
#     reader = csv.reader(f)
#     for temp in list(reader)[1:]:
#         if temp[0] == '06':
#             site = str(temp[2])
#             if site in ['1025', '0005', '0011', '0002', '1022', '4003', '0004', '2004', '1004', '1002', '1001']:
#                 if not 'SO2' in data[site]:
#                     co = collections.OrderedDict()
#                     date = temp[9]
#                     hourly = collections.OrderedDict()
#                     hourly[temp[10]] = temp[13]
#                     co[date] = hourly
#                     data[site]['SO2'] = co
#                 else:
#                     date = temp[9]
#                     co = data[site]['SO2']
#                     if not date in co:
#                         hourly = collections.OrderedDict()
#                         hourly[temp[10]] = temp[13]
#                         co[date] = hourly
#                     else:
#                         co[date][temp[10]] = temp[13]

# with open('Ozone.csv', 'rb') as f:
#     reader = csv.reader(f)
#     for temp in list(reader)[1:]:
#         if temp[0] == '06':
#             site = str(temp[2])
#             if site in ['1025', '0005', '0011', '0002', '1022', '4003', '0004', '2004', '1004', '1002', '1001']:
#                 if not 'Ozone' in data[site]:
#                     co = collections.OrderedDict()
#                     date = temp[9]
#                     hourly = collections.OrderedDict()
#                     hourly[temp[10]] = temp[13]
#                     co[date] = hourly
#                     data[site]['Ozone'] = co
#                 else:
#                     date = temp[9]
#                     co = data[site]['Ozone']
#                     if not date in co:
#                         hourly = collections.OrderedDict()
#                         hourly[temp[10]] = temp[13]
#                         co[date] = hourly
#                     else:
#                         co[date][temp[10]] = temp[13]

# with open('dataset.json', 'w') as f:
#     f.write(json.dumps(data))