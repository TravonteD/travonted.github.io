
# TODO tasks:
# - rendering of the home page with links to the articles (using erb)

source_files = FileList['src/*.md']
articles = source_files.pathmap('articles/%n.html')

task default: [articles, 'style.css']

directory 'articles'
file articles => [source_files, :articles] do |t|
  sh "pandoc -so #{t.name} --template=template.html --css=../style.css #{t.source}"
end

file 'style.css' => 'style.scss' do |t|
  sh "sass #{t.source} #{t.name}"
end
