
import re
import tim
m=open('result.html', 'w')
m.write('<!DOCTYPE html>\n')
m.write('<html><head><meta http-equiv="Content-Type" content="text/html" charset=UTF-8"></head><body><ul>')
nw=int(tim.tim())*1000
r=requests.get('https://api.meetup.com/2/concierge?key=1d406f385b224a6a1ca3022222a7925&sign=true&photo-host=public&country=us&city=Boston&category_id=34&state=MA')
zg=re.findall(r'"name":"([\w\ \(\)\:]+)","id":"[\w ]+","time"', r.text)
ad=re.findall(r'"address_1":"([\w\ \.\&]+)"', r.text)
tim=re.findall(r'"name":"[\w\ \(\)\:]+","id":"[\w ]+","time":([\d]+)', r.text)
for i in range(7):
    m.write('<li>' + str(i) + 'day - '+ str(i+1) +' day \n<ul>\n')
    for j in range(len(zg)):
        if (int(tim[j])<((i+1)*86400000+nw)) and (int(tim[j])>(i*86400000+nw)):
            date=time.strftime("%a, %d %b %Y %H:%M:%S", time.localtime(float(times[j])/1000))
            m.write('<li>' + str(date) + ',        ' + str(zg[j]) + ',         ' + str(ad[j]) + '</li>\n')
    m.write('</ul></li>\n')
m.write('</ul></body></html>')
