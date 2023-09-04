for i in range(1, 47) :
    line = input()
    ar = line.split(',')
    print('update "Destination" set lat = ' + ar[0] + ', lng =' + ar[1] + ' where id = ' + str(i) + ';')
    
