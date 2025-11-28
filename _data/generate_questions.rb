require 'json'

questions = JSON.parse(File.read('_data/questions.json'))
existing_count = questions.length

(existing_count + 1..50).each do |i|
  questions << {
    "id" => i,
    "question" => "Sample Question #{i}",
    "options" => ["Option A", "Option B", "Option C", "Option D"],
    "answer" => rand(0..3)
  }
end

File.write('_data/questions.json', JSON.pretty_generate(questions))
