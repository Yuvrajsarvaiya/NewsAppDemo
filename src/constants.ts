import {Dimensions} from 'react-native';

export const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} =
  Dimensions.get('window');

export const OFFSET = 20;
export const CARD_IMAGE_HEIGHT = SCREEN_HEIGHT * 0.3;
export const CARD_HEIGHT = SCREEN_HEIGHT - OFFSET;
export const MAX_HEIGHT_CONTENT = SCREEN_HEIGHT - CARD_IMAGE_HEIGHT - 50;

export const htmlContent1 = {
  html: `
  <div style="font-family: Arial, sans-serif; font-size: 16px; color: #707070;">
  <h2 style="color: #222222;">Welcome to React Native Render HTML!</h2>
  <p>This is a long HTML content for testing purposes. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec justo ac lectus condimentum sagittis non quis velit. Integer id mi a est varius elementum. Quisque in eros vitae orci mattis sollicitudin. Morbi ut ullamcorper libero, nec venenatis lectus. Fusce gravida massa felis, eu rhoncus mi eleifend id. Aliquam eu ex justo.</p>
  <p>Nam rutrum tempor leo, ac egestas velit scelerisque sit amet. Donec pretium tortor quis nisi dignissim suscipit. Duis lacinia bibendum risus, non posuere odio gravida eget. Sed nec justo ac dolor venenatis scelerisque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur in leo mi. Nullam vitae tortor in nunc convallis rutrum. Aenean ut odio nec elit sollicitudin consectetur. Cras posuere sapien vitae mi finibus feugiat. Integer fringilla, odio vel tincidunt mattis, leo libero consequat tellus, in viverra justo sem in nisi.</p>
  <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nam consectetur, purus sit amet iaculis tincidunt, ex enim pellentesque risus, et sodales augue ligula sit amet velit. Integer tempor, lectus non dignissim vestibulum, mi justo facilisis sem, et lobortis libero est et elit. Nullam lacinia est id est lobortis, quis mollis odio rutrum. Ut aliquam quam quis mauris interdum lacinia. Maecenas sed odio lacinia, tempus tortor ac, ullamcorper velit. Ut vel diam in dolor hendrerit bibendum eu sit amet lorem. Proin aliquam sit amet risus eget suscipit.</p>
  <p>Proin vel vehicula leo, et iaculis sapien. Quisque iaculis, lacus nec interdum feugiat, mauris libero aliquam libero, sed vestibulum eros ligula ut nulla. Suspendisse potenti. Duis vitae malesuada risus, non convallis sapien. Suspendisse potenti. Suspendisse potenti. Duis vitae malesuada risus, non convallis sapien.</p>
  <p>Donec sit amet est mi. Mauris vehicula, libero vel viverra rutrum, est ex mollis sapien, sit amet accumsan magna enim in lorem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec non vestibulum erat. Mauris tincidunt nisi sed metus posuere lobortis. Sed vitae metus luctus, dictum leo et, placerat lacus. Phasellus et rutrum orci. Duis aliquam condimentum libero, nec egestas purus dapibus ut. Nulla interdum velit quis orci condimentum, nec eleifend velit tincidunt.</p>
</div>
`,
};

export const htmlContent2 = {
  html: `
  <div style="font-family: Arial, sans-serif; font-size: 16px; color: #707070;">
  <h2 style="color: #222222;">Welcome to React Native Render HTML!</h2>
  <p>This is a long HTML content for testing purposes. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec justo ac lectus condimentum sagittis non quis velit. Integer id mi a est varius elementum. Quisque in eros vitae orci mattis sollicitudin. Morbi ut ullamcorper libero, nec venenatis lectus. Fusce gravida massa felis, eu rhoncus mi eleifend id. Aliquam eu ex justo.</p>
</div>
`,
};

export const htmlContent = [htmlContent1, htmlContent2];
