import pandas as pd

# read destinations.csv in dataframe
df = pd.read_csv('destinations.csv')

# create a new dataframe with only the columns we need
df = df[['DestinationName', 'City', 'State', 'Description']]

# find the unique cities in the dataframe and provide them id 1,2,3,4...
df['CityID'] = df['City'].factorize()[0]
df['CityID'] += 1

df['state_id'] = 1
df['country_id'] = 1

df['DestinationID'] = df.index + 1


# create a new dataframe with only the columns we need, we need destination_id, destination_name, city_id, description
df2 = df[['DestinationID', 'DestinationName', 'country_id', 'state_id', 'CityID', 'Description']]


# save the dataframe to a csv file
df2.to_csv('destinationsEntry.csv', index=False)

# create a new dataframe with only the columns we need, we need city_id, city_name, state_id (as we have only 1 state with id 1)
df3 = df[['CityID', 'City']]
df3 = df3.drop_duplicates()
# put 1 in state_id column
df3['s_id'] = 1

df3.to_csv('citiesEntry.csv', index=False)

# read hotels.csv in dataframe
df4 = pd.read_csv('Hotels.csv')

# enter a new column hotel_id with values 1,2,3,4...
df4['HotelID'] = df4.index + 1

# create a new column city_id and enter the city_id of the city from df3
df4['city_id'] = df4['City'].map(df3.set_index('City')['CityID'])

df4 = df4[['HotelID', 'HotelName', 'city_id', 'low','mid','high']]
# if low, mid, high contains -, replace it with -1
df4['low'] = df4['low'].replace('-', -1)
df4['mid'] = df4['mid'].replace('-', -1)
df4['high'] = df4['high'].replace('-', -1)


df4.to_csv('hotelsEntry.csv', index=False)



