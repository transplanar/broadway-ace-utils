# TODO create visual version

class AceUtils
    def self.write_from_file
        p 'init'
        path = './output.txt'
        readPath = './readFrom.txt'
        
        p "Read from #{readPath}"
        p "Save to #{path}"
        
        begin
            File.open(path, "w+") do |f|
                content = []
                
                File.open(readPath).each do |line|
                    content << create_RHS_string(line.strip)+"\n"
                end
                
                content.each do |line|
                    f.write(line)
                end
            end
        rescue StandardError => bang
          print "Error running script: " + bang
        end
        
        p 'Complete'
    end
    
    def self.create_RHS_string(content)
       return "Red Hot Spotlight: #{content} Find More: http://www.broadwayace.com/current-ads"
    end
end