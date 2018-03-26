class Api::V1::RhbGeneratorController < Api::V1::BaseController 
    before_filter :default_request_format

    def format
        @result = ConvertToRHB.call(params).converted_text
        
        render json: @result
    end

    private
    
    def default_request_format
        request.format = :json
    end
end