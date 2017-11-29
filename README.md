# project-lorelei
## team member: Haotian Zhang, Jing Peng, Fan Pan, Qianhui You ##
## demo link: http://www-scf.usc.edu/~zhan559/lorelei/index.html ##
## backup demo link: http://scf.usc.edu/~fanpan/project2/index.html ##

## Week 1 ##
Progress:  
1. Finished outlining the plan of our project, including what are the pages we need to show, what are the graphs, structure, storytelling, etc. It can be seen in Visualization_plan.pdf file.  
2. Found the data we need (from https://aqs.epa.gov/aqsweb/airdata/download_files.html#Raw). The raw data source contains hourly pollution level reading for each pollutant.  
3. Decided the scale of our project. If using the compelte data, our project could be giant. So we limited our scale to one county of one state. The timespan we will focus on is one month. We also plan to do data profiling for one year. The granularity will be one day.  
4. Perfomed data processing. We selected the data in the time period we need, and discarded the unnecessary fields. Data can be found in CO.json, NO2.json, Ozone.json, SO2.json. The data processing script is dataProcessing.py.  
5. Started working with bootstrap. We played with bootstrap a bit and learnt how to use it to help us create beautiful webpages.  

## Week 2 ##
Progress:  
1. Worked out the prototype. We've exported it as the pdf file stored in the root directory.  
2. Working on heatmap. Had made it out in GIS software and have the data after interpolation. We are continuing working on it and will finish it using D3.  
3. Worked on various kinds of visualizations such as line chart, bar chart, and pie chart.  
4. Getting familiar with Angular by following online guides and tutorials.  
5. Getting familiar with bootstrap by following online guides and tutorials, and working on using it to create our own webpages.  
