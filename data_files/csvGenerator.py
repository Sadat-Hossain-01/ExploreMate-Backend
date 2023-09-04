import pandas as pd
import random

# read destinations.csv in dataframe
df = pd.read_csv('destinations.csv')
# trim all the values in the dataframe
df = df.apply(lambda x: x.str.strip() if x.dtype == "object" else x)

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

# add a column rating and enter random values between 2.21 and 4.89
df2['rating'] = df2['DestinationID'].apply(lambda x: round(random.uniform(2.21, 4.89), 2))
df2['rating_count'] = df2['DestinationID'].apply(lambda x: random.randint(100, 1000))

df2['estimated_cost'] = df2['DestinationID'].apply(lambda x: round(random.uniform(1.4, 60.1), 1))
df2['estimated_time'] = df2['DestinationID'].apply(lambda x: round(random.uniform(0.5, 5.1), 1))

df2['lat'] = df2['DestinationID'].apply(lambda x: round(random.uniform(24.85, 24.95), 5))
df2['lng'] = df2['DestinationID'].apply(lambda x: round(random.uniform(91.85, 91.95), 5))

df2['img_url'] = df2['DestinationID'].apply(lambda x: 'https://picsum.photos/200/300?image=' + str(x))

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
# trim all the values in the dataframe
df4 = df4.apply(lambda x: x.str.strip() if x.dtype == "object" else x)

# enter a new column hotel_id with values 1,2,3,4...
df4['HotelID'] = df4.index + 1

# create a new column city_id and enter the city_id of the city from df3
df4['city_id'] = df4['City'].map(df3.set_index('City')['CityID'])

df4 = df4[['HotelID', 'HotelName', 'city_id', 'low','mid','high']]
# if low, mid, high contains -, replace it with -1
df4['low'] = df4['low'].replace('-', -1)
df4['mid'] = df4['mid'].replace('-', -1)
df4['high'] = df4['high'].replace('-', -1)

# add a column star and enter random values between 1 and 5
df4['star'] = df4['HotelID'].apply(lambda x: random.randint(1, 5))

# add lat and lng columns and enter random values from Sylhet, Bangladesh
df4['lat'] = df4['HotelID'].apply(lambda x: round(random.uniform(24.85, 24.95), 5))
df4['lng'] = df4['HotelID'].apply(lambda x: round(random.uniform(91.85, 91.95), 5))

df4['site_url'] = 'https://www.google.com/search?q=' + df4['HotelName']
df4['img_url'] = df4['HotelID'].apply(lambda x: 'https://picsum.photos/200/300?image=' + str(x))


# search google using hotelname from df4 and get the image url, enter it in the column image_url
# 
# df4['image_url'] = 'https://www.google.com/search?q=' + df4['HotelName'] + '&tbm=isch'

df4.to_csv('hotelsEntry.csv', index=False)


# to generating Restaurants info
df5 = pd.read_csv('Restaurants.csv')
# trim all the values in the dataframe
df5 = df5.apply(lambda x: x.str.strip() if x.dtype == "object" else x)

# create a new column city_id and enter the city_id of the city from df3
df5['city_id'] = df5['city'].map(df3.set_index('City')['CityID'])

# add three columns breakfast_low, breakfast_mid, breakfast_high
# if class is '$' breakfast_low is random in between 0.5 and 1.5, breakfast_mid is random in between 1.5 and 2.5, breakfast_high is random in between 2.5 and 3.5
# if class is '$$' breakfast_low is random in between 1.5 and 2.5, breakfast_mid is random in between 2.5 and 3.5, breakfast_high is random in between 3.5 and 4.5
# if class is '$$$' breakfast_low is random in between 2.5 and 3.5, breakfast_mid is random in between 3.5 and 4.5, breakfast_high is random in between 4.5 and 5.5

df5['breakfast_low'] = df5['class'].apply(lambda x: round(random.uniform(0.5, 1.5), 1) if x == '$' else round(random.uniform(1.5, 2.5), 1) if x == '$$' else round(random.uniform(2.5, 3.5), 1))
df5['breakfast_mid'] = df5['class'].apply(lambda x: round(random.uniform(1.5, 2.5), 1) if x == '$' else round(random.uniform(2.5, 3.5), 1) if x == '$$' else round(random.uniform(3.5, 4.5), 1))
df5['breakfast_high'] = df5['class'].apply(lambda x: round(random.uniform(2.5, 3.5), 1) if x == '$' else round(random.uniform(3.5, 4.5), 1) if x == '$$' else round(random.uniform(4.5, 5.5), 1))

# do same for lunch and dinner
df5['lunch_low'] = df5['class'].apply(lambda x: round(random.uniform(0.5, 1.5), 1) if x == '$' else round(random.uniform(1.5, 2.5), 1) if x == '$$' else round(random.uniform(2.5, 3.5), 1))
df5['lunch_mid'] = df5['class'].apply(lambda x: round(random.uniform(1.5, 2.5), 1) if x == '$' else round(random.uniform(2.5, 3.5), 1) if x == '$$' else round(random.uniform(3.5, 4.5), 1))
df5['lunch_high'] = df5['class'].apply(lambda x: round(random.uniform(2.5, 3.5), 1) if x == '$' else round(random.uniform(3.5, 4.5), 1) if x == '$$' else round(random.uniform(4.5, 5.5), 1))

df5['dinner_low'] = df5['class'].apply(lambda x: round(random.uniform(0.5, 1.5), 1) if x == '$' else round(random.uniform(1.5, 2.5), 1) if x == '$$' else round(random.uniform(2.5, 3.5), 1))
df5['dinner_mid'] = df5['class'].apply(lambda x: round(random.uniform(1.5, 2.5), 1) if x == '$' else round(random.uniform(2.5, 3.5), 1) if x == '$$' else round(random.uniform(3.5, 4.5), 1))
df5['dinner_high'] = df5['class'].apply(lambda x: round(random.uniform(2.5, 3.5), 1) if x == '$' else round(random.uniform(3.5, 4.5), 1) if x == '$$' else round(random.uniform(4.5, 5.5), 1))

# add a column rating and enter random values between 2.21 and 4.89
df5['rating'] = df5['id'].apply(lambda x: round(random.uniform(2.21, 4.89), 2))
df5['rating_count'] = df5['id'].apply(lambda x: random.randint(100, 1000))

df5 = df5[['id', 'name', 'city_id', 'class', 'breakfast_low', 'breakfast_mid', 'breakfast_high', 'lunch_low', 'lunch_mid', 'lunch_high', 'dinner_low', 'dinner_mid', 'dinner_high', 'rating', 'rating_count', 'site_url', 'img_url']]

df5.to_csv('restaurantsEntry.csv', index=False)


