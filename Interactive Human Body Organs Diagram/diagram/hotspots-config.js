var hotspots_config = {
	'hotspots':[
	{
		'hover': '<u><b>Hotspot "A"</b></u><br>Add unlimited number of spots<br>anywhere on the diagram and<br>customize its colors and size and<br>link it to any webpage.',//the hover content of this hotspot
		'pos_X':84,// X position, to get the accurate value, please check the documentation folder.
		'pos_Y':137,// Y position, to get the accurate value, please check the documentation folder.
		'diameter':16,// diameter of this spot

		'upColor':'#FF0000',// normal color when the page loads
		'upOpacity':'0.8',// opacity of that color from 0-1 (e.g 0.3, can be 0 to hide it)
		'outlineUpColor':'#FFFF00',// outline color of the spot when the page loads
		'outlineUpOpacity':'0.8',// opacity of the outline (e.g 0.3, can be 0 to hide it)


		'overColor':'#FAE105',// color of this spot when you hover with mouse
		'overOpacity':'1',// opacity of that color from 0-1 (e.g 0.3, can be 0 to hide it)
		'outlineOverColor':'#FF0000',// outline color of the spot when you hover with mouse
		'outlineOverOpacity':'1',// opacity of the outline (e.g 0.3, can be 0 to hide it)

		'downColor':'#FF6600',// color of this spot when you click it
		'downOpacity':'1',// opacity of that color from 0-1 (e.g 0.3, can be 0 to hide it)
		'outlineDownColor':'#CC3300',// outline color of the spot when you click it
		'outlineDownOpacity':'1',// opacity of the outline (e.g 0.3, can be 0 to hide it)

		'url':'http://www.yourlink.com',// go to this URL
		'target':'same_window',//'new_window' opens URL in new window//'same_window' opens URL in the same window //'none' pin is not clickable
		'enable':true,//true/false to enable/disable this pin
	},
	{
		'hover': 'Fake shadow below the "B" spot',
		'pos_X':236,
		'pos_Y':315,
		'diameter':22,

		'upColor':'#000',
		'upOpacity':'0.5',
		'outlineUpColor':'#000',
		'outlineUpOpacity':'0.5',


		'overColor':'#FF6600',
		'overOpacity':'1',
		'outlineOverColor':'#FF6600',
		'outlineOverOpacity':'1',

		'downColor':'#CC6600',
		'downOpacity':'1',
		'outlineDownColor':'#800000',
		'outlineDownOpacity':'1',

		'url':'http://www.yourlink.com',
		'target':'same_window',
		'enable':false,
	},
	{
		'hover': '<u><b>Hotspot "B"</b></u><br>Add unlimited number of spots<br>anywhere on the diagram and<br>customize its colors and size and<br>link it to any webpage.',
		'pos_X':235,
		'pos_Y':314,
		'diameter':20,

		'upColor':'#FF0000',
		'upOpacity':'1',
		'outlineUpColor':'#FFFF00',
		'outlineUpOpacity':'1',


		'overColor':'#FAE105',
		'overOpacity':'1',
		'outlineOverColor':'#FF0000',
		'outlineOverOpacity':'1',

		'downColor':'#FF6600',
		'downOpacity':'1',
		'outlineDownColor':'#CC3300',
		'outlineDownOpacity':'1',

		'url':'http://www.yourlink.com',
		'target':'same_window',
		'enable':true,
	},
	{
		'hover': '<u><b>Hotspot "C"</b></u><br>Add unlimited number of spots<br>anywhere on the diagram and<br>customize its colors and size and<br>link it to any webpage.',
		'pos_X':137,
		'pos_Y':440,
		'diameter':20,

		'upColor':'#0066FF',
		'upOpacity':'1',
		'outlineUpColor':'#333399',
		'outlineUpOpacity':'1',


		'overColor':'#FAE105',
		'overOpacity':'1',
		'outlineOverColor':'#FF0000',
		'outlineOverOpacity':'1',

		'downColor':'#FF6600',
		'downOpacity':'1',
		'outlineDownColor':'#CC3300',
		'outlineDownOpacity':'1',

		'url':'http://www.yourlink.com',
		'target':'same_window',
		'enable':true,
	},
	]
}
