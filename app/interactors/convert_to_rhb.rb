class ConvertToRHB 
    include Interactor
    
    def call
        context.converted_text = "Red Hot Spotlight: #{context.query} Find More: http://www.broadwayace.com/current-ads"
    end
end