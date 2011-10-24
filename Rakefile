SERVER     = "og"
BRANCH     = "jack"
ROOT       = "/srv/http/inno"
PATH       = "#{ROOT}/jacktheapp.ca/htdocs"
REPO_ROOT  = "http://github.com/innovatis"
REPO       = "websites"
TMP        = "#{BRANCH}_tmp"

task :deploy do
  puts "deploying: #{REPO_ROOT}/#{REPO} to #{SERVER}:#{PATH}"
  sleep 2
  puts "starting:"

  system <<-END
    ssh #{SERVER} " cd #{ROOT}  &&
    rm -rf #{PATH}              &&
    git clone #{REPO_ROOT}/#{REPO} --depth 0 #{PATH} &&
    cd #{PATH}                  &&
    git checkout #{BRANCH}      &&
    rm -rf Rakefile             &&
    rm -rf .git                 &&
    chmod -R g+w #{PATH}"
  END
  puts "finished"
end
