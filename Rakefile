
# TODO tasks:
# - rendering of the home page with links to the articles (using erb)

source_files = FileList['src/*.md']
articles = source_files.pathmap('articles/%n.html')

task default: articles

directory 'articles'
file articles => [source_files, :articles] do |t|
  sh "pandoc -o #{t.name} #{t.source}"
end

# rule '.html' => ->{ "src/#{_1.ext('')}.md" } do |t|
#   sh "pandoc -o articles/#{t.name} #{t.source}"
# end
