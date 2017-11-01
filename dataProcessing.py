import csv
import json
import collections

# countyInfo = {}
# with open('CO.csv', 'rb') as f:
#     reader = csv.reader(f)
#     for temp in list(reader)[1:]:
#         k = str(temp[0]) + str(temp[1])
#         if not k in countyInfo:
#             v= []
#             v.append(str(temp[2]))
#             countyInfo[k] = v
#         else:
#             if not str(temp[2]) in countyInfo[k]:
#                 countyInfo[k].append(str(temp[2]))
#
# print countyInfo
# co =[]
# for key in countyInfo:
#     if len(countyInfo[key]) > 6:
#         co.append(key)
#
# countyInfo = {}
# with open('Ozone.csv', 'rb') as f:
#     reader = csv.reader(f)
#     for temp in list(reader)[1:]:
#         k = str(temp[0]) + str(temp[1])
#         if not k in countyInfo:
#             v= []
#             v.append(str(temp[2]))
#             countyInfo[k] = v
#         else:
#             if not str(temp[2]) in countyInfo[k]:
#                 countyInfo[k].append(str(temp[2]))
#
# print countyInfo
# ozone =[]
# for key in countyInfo:
#     if len(countyInfo[key]) > 6:
#         ozone.append(key)
#
# countyInfo = {}
# with open('SO2.csv', 'rb') as f:
#     reader = csv.reader(f)
#     for temp in list(reader)[1:]:
#         k = str(temp[0]) + str(temp[1])
#         if not k in countyInfo:
#             v= []
#             v.append(str(temp[2]))
#             countyInfo[k] = v
#         else:
#             if not str(temp[2]) in countyInfo[k]:
#                 countyInfo[k].append(str(temp[2]))
#
# print countyInfo
# so2 =[]
# for key in countyInfo:
#     if len(countyInfo[key]) > 6:
#         so2.append(key)
#
# countyInfo = {}
# with open('NO2.csv', 'rb') as f:
#     reader = csv.reader(f)
#     for temp in list(reader)[1:]:
#         k = str(temp[0]) + str(temp[1])
#         if not k in countyInfo:
#             v= []
#             v.append(str(temp[2]))
#             countyInfo[k] = v
#         else:
#             if not str(temp[2]) in countyInfo[k]:
#                 countyInfo[k].append(str(temp[2]))
#
# print countyInfo
# no2 =[]
# for key in countyInfo:
#     if len(countyInfo[key]) > 6:
#         no2.append(key)
#
# print set(co) & set(ozone)

### we are using data of 8 sites at state 4 county 13
data = collections.OrderedDict()
with open('NO2.csv', 'rb') as f:
    reader = csv.reader(f)
    for temp in list(reader)[1:]:
        if temp[0] == '04' and temp[1] == '013':
            site = str(temp[2])
            if not site in data:
                data[site] = collections.OrderedDict()
                position = collections.OrderedDict()
                position['latutude'] = temp[5]
                position['longitude'] = temp[6]
                data[site]['position'] = position
                co = collections.OrderedDict()
                date = temp[9]
                hourly = collections.OrderedDict()
                hourly[temp[10]] = temp[13]
                co[date] = hourly
                data[site]['NO2'] = co
            else:
                date = temp[9]
                co = data[site]['NO2']
                if not date in co:
                    hourly = collections.OrderedDict()
                    hourly[temp[10]] = temp[13]
                    co[date] = hourly
                else:
                    co[date][temp[10]] = temp[13]


with open('NO2.json', 'w') as f:
    f.write(json.dumps(data))

