import re
f1= open('access.log' , 'r') 
s=set() 
for line in f1.readlines(): 
    result = re.findall(r'[1-2]?[0-9]?[0-9]\.[1-2]?[0-9]?[0-9]\.[1-2]?[0-9]?[0-9]\.[1-2]?[0-9]?[0-9]' , line)
    c=str(result)
    result1 = re.search(r'[2][5][6-9]', c)
    result2 = re.search(r'[2][6-9][0-9]', c)
    if (not result1 and not result2): 
        s.update(result) 
s = list(s)
print(len(s))
print(s)
c=set() 
for item in s:
    result = re.findall(r'[1-2]?[0-9]?[0-9]\.[1-2]?[0-9]?[0-9]\.[1-2]?[0-9]?[0-9]\.', item) 
    c.update(result) 
c = list(c)
for item in c:
    for item2 in s:
        if item2.startswith(item):
            print(item2)
    print(" ")
    
    

