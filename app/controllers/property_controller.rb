class PropertyController < ApplicationController
require 'net/http'
require 'active_support/all'
require 'json'

  def index
      numberofhouses=20;
    retsly = JSON.parse(Net::HTTP.get(URI.parse("https://rets.io/api/v1/armls/listings?access_token=fc54b2a2ebacc3c920a63e2b016a215c&limit="+numberofhouses.to_s+"&near=33.4500,-112.0667&radius=100mi")))["bundle"]
    for i in 0..retsly.length-1
    house=retsly[i]
    #does not account for unit number of apartments
   compositeAddress=house["streetNumber"]+"+"+house["streetName"]+"&citystatezip="+house["city"]+","+house["state"]+house["zipCode"]
   #puts(compositeAddress+"*******************")
    zillowurl='http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz1f09lxzlhxn_agge7&address='+compositeAddress+'&rentzestimate=true'
  puts(zillowurl)
  puts(i)
     zillowXML = Hash.from_xml(Net::HTTP.get(URI.parse(zillowurl)))
     if zillowXML['searchresults']['response']!=nil
     zillowData=zillowXML['searchresults']['response']['results']
     resultarray=[]
     zpid=[]
     puts(i)
     if (zillowData['result']).is_a?(Array)
        zillowData['result'].each do |x|
          if(x['rentzestimate']!=nil)
          puts(i.to_s+"multiple listings")
          resultarray.push(x['rentzestimate']['amount'].to_i)
          zpid.push(x['zpid'].to_i)

        else
          resultarray.push(0)
          zpid=[0]
        end

        end
      else
        if(zillowData['result']!=nil)
          if(zillowData['result']['rentzestimate']!=nil)
            resultarray.push(zillowData['result']['rentzestimate']['amount'].to_i)
            zpid=[zillowData['result']['zpid'].to_i]
          else
            resultarray.push(0)
            zpid=[0]
          end
        else
          resultarray.push(0)
          zpid=[0]
        end
      end
    else
      resultarray=[0]
      zpid=[0]
    end
      retsly[i]["rent"]=resultarray
      retsly[i]['zpid']=zpid #array
     puts(resultarray)
    end
    #binding.pry
     gon.result = retsly.select{|y| y["rent"][0]>0&&y["rent"].length==1}#result
end
end