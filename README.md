# 🎂 Birthday Website for Your Boyfriend ❤️

A beautiful, romantic birthday website with animations, music, and interactive features!

## 🌟 Features Included

✅ Landing page with photo and animated text
✅ Navigation menu
✅ Timeline of your relationship
✅ Photo gallery with captions
✅ Heartfelt letter section
✅ Reasons why you love him
✅ Live countdown timer
✅ Interactive surprise with confetti
✅ Promise/future section
✅ Background music control
✅ Floating hearts animation
✅ Responsive design for mobile

## 📝 How to Customize

### 1. Add Your Photos
Replace these placeholder images with your actual photos:
- `couple-photo.jpg` - Main landing page photo
- `first-meet.jpg` - First time you met
- `first-chat.jpg` - First chat screenshot
- `first-photo.jpg` - First photo together
- `special-memory.jpg` - Special memory photo
- `photo1.jpg` to `photo6.jpg` - Gallery photos

### 2. Add Background Music
- Add his favorite song as `birthday-song.mp3` in the same folder
- Supported formats: MP3, WAV, OGG

### 3. Customize the Text

**In index.html:**
- Line 16: Change the main heading text
- Lines 42-60: Update timeline dates and descriptions
- Lines 88-102: Edit the letter content
- Lines 110-121: Modify reasons why you love him
- Lines 145-149: Update surprise message

**In script.js:**
- Line 47: Set your relationship start date
  ```javascript
  const startDate = new Date(2023, 0, 1); // Change to your date (Year, Month-1, Day)
  ```

### 4. Add Video Message (Optional)
- Uncomment lines 147-149 in index.html
- Add your video file as `birthday-message.mp4`

## 🚀 How to Use

1. Open `index.html` in any web browser
2. Click "Click to Enter" button
3. Navigate through sections using the top menu
4. Control music with the button in bottom-right corner

## 💡 Tips

- Test the website before showing it to him
- Make sure all photos are added
- Check that the music file is in the correct format
- Update the countdown date to your actual relationship start date
- Personalize all the text sections with your own words

## 🎨 Color Scheme

The website uses a romantic purple/pink gradient theme. To change colors:
- Edit `styles.css`
- Look for `background: linear-gradient(...)` lines
- Replace with your preferred colors

## 📱 Mobile Friendly

The website is fully responsive and works great on phones and tablets!

## ❤️ Made with Love

Enjoy creating this special gift for your boyfriend's birthday! 🎉
