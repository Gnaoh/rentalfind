class PropertyController < ApplicationController
  require 'open-uri'
  require 'json'
  require 'active_support/core_ext/hash'
  	def index
        url="http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz1f09tu41pu3_am2o3&address=2030+west+whisper+rock+trail&citystatezip=phoenix,arizona85085&rentzestimate=true"
          xmldata=""
          open(url) do |uri|
          uri.each_line{|line| xmldata=line}

          @xmldata = JSON.pretty_generate(Hash.from_xml(xmldata))
    end
  end
end


