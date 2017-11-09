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

### we are using data of sites at state 6
# data = collections.OrderedDict()
# with open('NO2.csv', 'rb') as f:
#     reader = csv.reader(f)
#     for temp in list(reader)[1:]:
#         if temp[0] == '06':
#             site = str(temp[2])
#             if not site in data:
#                 data[site] = collections.OrderedDict()
#                 position = collections.OrderedDict()
#                 position['latitude'] = temp[5]
#                 position['longitude'] = temp[6]
#                 data[site]['position'] = position
#                 co = collections.OrderedDict()
#                 date = temp[9]
#                 hourly = collections.OrderedDict()
#                 hourly[temp[10]] = temp[13]
#                 co[date] = hourly
#                 data[site]['NO2'] = co
#             else:
#                 date = temp[9]
#                 co = data[site]['NO2']
#                 if not date in co:
#                     hourly = collections.OrderedDict()
#                     hourly[temp[10]] = temp[13]
#                     co[date] = hourly
#                 else:
#                     co[date][temp[10]] = temp[13]
#
#
# with open('NO2.json', 'w') as f:
#     f.write(json.dumps(data))

#################### combine data ##############################
# co = json.loads(open('CO.json').read())
# so = json.loads(open('SO2.json').read())
# no = json.loads(open('NO2.json').read())
# oz = json.loads(open('Ozone.json').read())
# print co.keys()
# print so.keys()
# print no.keys()
# print oz.keys()
# print set(co.keys()) & set(so.keys()) & set(no.keys()) & set(oz.keys())
# 
# combine = {}
# for site in co:
#     if site in ['1025', '0005', '0011', '0002', '1022', '4003', '0004', '2004', '1004', '1002', '1001']:
#         combine[site] = collections.OrderedDict()
#         combine[site]['position'] = co[site]['position']
#         combine[site]['CO'] = co[site]['CO']
#         combine[site]['SO2'] = so[site]['SO2']
#         combine[site]['NO2'] = no[site]['NO2']
#         combine[site]['Ozone'] = oz[site]['Ozone']
# 
# with open('pie_chart_data.json', 'w') as f:
#     f.write(json.dumps(combine))

data = collections.OrderedDict()
with open('CO.csv', 'rb') as f:
    reader = csv.reader(f)
    for temp in list(reader)[1:]:
        if temp[0] == '06':
            site = str(temp[2])
            if site in ['1025', '0005', '0011', '0002', '1022', '4003', '0004', '2004', '1004', '1002', '1001']:
                if not site in data:
                    data[site] = collections.OrderedDict()
                    position = collections.OrderedDict()
                    position['latitude'] = temp[5]
                    position['longitude'] = temp[6]
                    data[site]['position'] = position
                    co = collections.OrderedDict()
                    date = temp[9]
                    hourly = collections.OrderedDict()
                    hourly[temp[10]] = temp[13]
                    co[date] = hourly
                    data[site]['CO'] = co
                else:
                    date = temp[9]
                    co = data[site]['CO']
                    if not date in co:
                        hourly = collections.OrderedDict()
                        hourly[temp[10]] = temp[13]
                        co[date] = hourly
                    else:
                        co[date][temp[10]] = temp[13]

with open('NO2.csv', 'rb') as f:
    reader = csv.reader(f)
    for temp in list(reader)[1:]:
        if temp[0] == '06':
            site = str(temp[2])
            if site in ['1025', '0005', '0011', '0002', '1022', '4003', '0004', '2004', '1004', '1002', '1001']:
                if not 'NO2' in data[site]:
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

with open('SO2.csv', 'rb') as f:
    reader = csv.reader(f)
    for temp in list(reader)[1:]:
        if temp[0] == '06':
            site = str(temp[2])
            if site in ['1025', '0005', '0011', '0002', '1022', '4003', '0004', '2004', '1004', '1002', '1001']:
                if not 'SO2' in data[site]:
                    co = collections.OrderedDict()
                    date = temp[9]
                    hourly = collections.OrderedDict()
                    hourly[temp[10]] = temp[13]
                    co[date] = hourly
                    data[site]['SO2'] = co
                else:
                    date = temp[9]
                    co = data[site]['SO2']
                    if not date in co:
                        hourly = collections.OrderedDict()
                        hourly[temp[10]] = temp[13]
                        co[date] = hourly
                    else:
                        co[date][temp[10]] = temp[13]

with open('Ozone.csv', 'rb') as f:
    reader = csv.reader(f)
    for temp in list(reader)[1:]:
        if temp[0] == '06':
            site = str(temp[2])
            if site in ['1025', '0005', '0011', '0002', '1022', '4003', '0004', '2004', '1004', '1002', '1001']:
                if not 'Ozone' in data[site]:
                    co = collections.OrderedDict()
                    date = temp[9]
                    hourly = collections.OrderedDict()
                    hourly[temp[10]] = temp[13]
                    co[date] = hourly
                    data[site]['Ozone'] = co
                else:
                    date = temp[9]
                    co = data[site]['Ozone']
                    if not date in co:
                        hourly = collections.OrderedDict()
                        hourly[temp[10]] = temp[13]
                        co[date] = hourly
                    else:
                        co[date][temp[10]] = temp[13]

with open('dataset.json', 'w') as f:
    f.write(json.dumps(data))