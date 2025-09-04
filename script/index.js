const loadLessons =()=>{
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(res => res.json())
    .then(json => displayLesson(json.data))
};
const removeActive =()=>{
    const leassonButtons = document.querySelectorAll('.lesson-btn');
    leassonButtons.forEach(btn=>btn.classList.remove('active'));
};

const loadLevelWord=(id)=>{
   const url = `https://openapi.programming-hero.com/api/level/${id}` 
   fetch(url)
   .then(res => res.json())
   .then(data =>{
    removeActive();
    const clickBtn = document.getElementById(`lesson-btn-${id}`)
    clickBtn.classList.add('active')
    displayLevelWord(data.data)
   })
}
//Showcase Lessons Data
const displayLevelWord =(words)=>{
const wordContainer = document.getElementById('word-container');
wordContainer.innerHTML = '';
if(words.length === 0){
   wordContainer.innerHTML = `
   <div class=" text-center col-span-full rounded-xl py-10 space-y-6 font-bangla">
   <img class="mx-auto" src="./assets/alert-error.png" alt="">
    <p class="text-xl font-medium text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
    <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>
</div>
   `;
    return;
}

words.forEach(word =>{
const card = document.createElement('div');
card.innerHTML= `
<div class="bg-white rounded-lg shadow-sm text-center py-12 px-5 space-y-4">
<h2 class="font-bold text-2xl">${word.word ? word.word:'শব্দ পাওয়া যায় নি'}</h2>
<p class="font-semibold">Meaning /Pronounciation</p>
<div class="text-2xl font-medium font-bangla">"${word.meaning ? word.meaning : 'অর্থ পাওয়া যায় নি'}/ ${word.pronunciation ? word.pronunciation: 'উচ্চারণ পাওয়া যায় নি'}"</div>
<div class="flex justify-between items-center">
    <button onclick="my_modal_5.showModal()" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF70]"><i class="fa-solid fa-circle-info"></i></button>
    <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF70]"><i class="fa-solid fa-volume-high"></i></button>
</div>
</div>
`
wordContainer.append(card)
})
}

// get Lesson Option
const displayLesson =(lessons)=>{
const levelContainer =document.getElementById('level-container');
levelContainer.innerHTML ='';
lessons.forEach(lesson =>{
    const btnDiv = document.createElement('div');
    btnDiv.innerHTML=`
    <button id = 'lesson-btn-${lesson.level_no}'
     onclick='loadLevelWord(${lesson.level_no})' class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}</button>
    `
    levelContainer.append(btnDiv);
})
}
loadLessons()