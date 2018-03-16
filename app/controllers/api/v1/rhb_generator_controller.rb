class Api::V1::RhbGeneratorController < Api::V1::BaseController 
    before_filter :default_request_format

    def format
        @query = params[:query]
        # TODO: Review this: https://medium.com/@diegoy_kuri/a-place-for-your-business-logic-in-rails-9a5977ee6bc8
        # AceUtils.
        @result = "Test return"
        
        render json: @result
    end

    # def search
    #     @query, @limit = params[:query], params[:resultLimit]
    #     @result = Product.where('description LIKE ?', "%#{@query}%").limit(@limit)
    #     render json: @result
    # end

    private
    
    def default_request_format
        request.format = :json
    end
end