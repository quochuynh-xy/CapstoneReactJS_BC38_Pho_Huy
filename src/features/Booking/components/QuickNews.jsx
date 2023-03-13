import { Tabs } from "antd";
import { AiOutlineLike, AiOutlineComment } from "react-icons/ai";
const Movie24h = [
  {
    image:
      "https://kenh14cdn.com/thumb_w/660/203336854389633024/2022/9/4/800500-3-16623101089011137657104.jpg",
    title: "Cù lao xác sống là phim hay nhất 2022",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis voluptatum consequatur blanditiis, voluptatibus ex asperiores, sed omnis quaerat est vel quas dolor ut illum dolore, esse veniam reprehenderit incidunt sunt sit consequuntur.!",
    like: "100",
    cmt: "9",
  },
  {
    image:
      "https://kenh14cdn.com/203336854389633024/2023/1/11/photo-28-1673458596481184203390.jpg",
    title: "'Nhà Bà Nữ' đạt doanh thu khủng tại Mỹ",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis voluptatum consequatur blanditiis, voluptatibus ex asperiores, sed omnis quaerat est vel quas dolor ut illum dolore, esse veniam reprehenderit incidunt sunt sit consequuntur.!",
    like: "10",
    cmt: "9",
  },
  {
    image:
      "https://kenh14cdn.com/203336854389633024/2022/11/29/photo-1-1669703513656638600292.jpg",
    title: "Huyền Sử Vua Đinh Cán mốc doanh thu 100 tỷ",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis voluptatum consequatur blanditiis, voluptatibus ex asperiores, sed omnis quaerat est vel quas dolor ut illum dolore, esse veniam reprehenderit incidunt sunt sit consequuntur.!",
    like: "90",
    cmt: "9",
  },
  {
    image:
      "https://kenh14cdn.com/crop/640_360/2019/12/12/ngang-6-1576158019787670926824-crop-1576158037641838389241.png",
    title: "Chị Chị Em Em gây thất vọng vì không có cảnh nóng",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis voluptatum consequatur blanditiis, voluptatibus ex asperiores, sed omnis quaerat est vel quas dolor ut illum dolore, esse veniam reprehenderit incidunt sunt sit consequuntur.!",
    like: "999",
    cmt: "1299",
  },
  {
    image:
      "https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2021/3/19/890756/Bo-Gia-Tran-Thanh10.jpg",
    title: "Bố già là phim Việt hot nhất 2023",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis voluptatum consequatur blanditiis, voluptatibus ex asperiores, sed omnis quaerat est vel quas dolor ut illum dolore, esse veniam reprehenderit incidunt sunt sit consequuntur.!",
    like: "1",
    cmt: "4",
  },
  {
    image:
      "https://znews-photo.zingcdn.me/w660/Uploaded/qfssu/2022_11_10/1.jpg",
    title: "Hít drama mới với Seo Ye Ji",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis voluptatum consequatur blanditiis, voluptatibus ex asperiores, sed omnis quaerat est vel quas dolor ut illum dolore, esse veniam reprehenderit incidunt sunt sit consequuntur.!",
    like: "0",
    cmt: "0",
  },
  {
    image: "http://hanoimoi.com.vn/Uploads/images/phananh/2021/11/04/phim.jpg",
    title: "Tiếng khóc trong cô đơn của Ngạn",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis voluptatum consequatur blanditiis, voluptatibus ex asperiores, sed omnis quaerat est vel quas dolor ut illum dolore, esse veniam reprehenderit incidunt sunt sit consequuntur.!",
    like: "0",
    cmt: "19",
  },
  {
    image:
      "https://kenh14cdn.com/thumb_w/660/2019/6/2/photo-1-1559482096777205273862.png",
    title: 'Thông điệp mới của "Về nhà đi con"',
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis voluptatum consequatur blanditiis, voluptatibus ex asperiores, sed omnis quaerat est vel quas dolor ut illum dolore, esse veniam reprehenderit incidunt sunt sit consequuntur.!",
    like: "9",
    cmt: "12",
  },
];
const Review = [
  {
    image:
      "https://ghienreview.com/wp-content/uploads/2020/07/Ghien-review-Relic.jpg",
    title: "Review: Tàn Tích Quỷ Ám (Relic) - Ba thế hệ và mối liên kết",
    content: "Điểm nhấn của phim kinh dị năm 2020 chính là Tàn Tích Quỷ Ám",
    like: "10",
    cmt: "7",
  },
  {
    image: "https://i.imgur.com/EdT7ZcY.jpg",
    title: "Review: Dinh Thự Oan Khuất (Ghost Of War)",
    content:
      "Tuy là một bộ phim có chất lượng tốt, nhưng có vẻ Dinh Thự Oan Khuất vẫn chưa đủ để đem khán giả trở lại phòng vé!",
    like: "1",
    cmt: "2",
  },
  {
    image:
      "https://photos.tf1info.fr/images/700/700/affiche-du-film-blackkklansman-j-ai-infiltre-le-ku-klux-klan-b468d8-0@1x.jpeg",
    title: "BlacKkKlansman - cốc nước lạnh để người Mỹ thức tỉnh",
    content:
      "Tác phẩm nhận đề cử Phim truyện xuất sắc tại Oscar 2019 của đạo diễn Spike Lee là một lát cắt nữa về nạn phân biệt chủng tộc - nỗi đau gây nhức nhối nước Mỹ cho tới tận hôm nay.",
    like: "1",
    cmt: "12",
  },
  {
    image: "https://i.ytimg.com/vi/5bP1f_1o-zo/maxresdefault.jpg",
    title: "American Sniper - Chính nghĩa hay phi nghĩa?",
    content:
      "American Sniper khắc họa một tay súng bắn tỉa “huyền thoại” của Hải quân Mỹ với 4 lần tham chiến ở Trung Đông. Câu chuyện phim chậm rãi đưa người xem qua từng thời khắc khác nhau của Kyle, từ thửa nhỏ, thiếu niên, rồi gia nhập quân đội, rồi tham chiến.",
    like: "8",
    cmt: "7",
  },
  {
    image:
      "https://photo-cms-plo.epicdn.me/w850/Uploaded/2023/nkxrxqeiox/2021_12_13/5_vttm.jpeg",
    title: "Nhìn lại chặng đường của Spider-Man trong vũ trụ điện ảnh Marvel",
    content:
      "Phần phim riêng đầu tiên của Spider-Man thuộc MCU diễn ra ngay sau các sự kiện trong Captain America: Civil War.",
    like: "8",
    cmt: "7",
  },
  {
    image: "https://t.vietgiaitri.com/2010/11/quai.jpg",
    title: "Quái vật sông Hàn là bộ phim quái thú đầu tiên của Hàn Quốc?",
    content:
      "Bộ phim kể về sự tiến hóa của một con cá bởi ảnh hưởng của chất độc hóa học",
    like: "0",
    cmt: "8",
  },
  {
    image:
      "https://khenphim.com/wp-content/uploads/2020/03/sieu-ve-si-so-vo-1-poster.jpg",
    title: "Đội vợ lên đầu, cứu nguy tổng thống",
    content: "Bộ phim xuất sắc của điện ảnh Thái Lan năm 2020",
    like: "10",
    cmt: "3",
  },
  {
    image:
      "https://game8.vn/media/202212/images/dan-sao-dong-mau-anh-jhng%20(6).jpg",
    title: "[review] -  Dòng máu anh hùng, đỉnh cao võ thuật",
    content: "Bộ phim xuất sắc của Jonny Trí Nguyễn",
    like: "110",
    cmt: "300",
  },
  {
    image:
      "https://game8.vn/media/202212/images/dan-sao-dong-mau-anh-jhng%20(6).jpg",
    title: "[review] -  Dòng máu anh hùng, đỉnh cao võ thuật",
    content: "Bộ phim xuất sắc của Jonny Trí Nguyễn",
    like: "110",
    cmt: "300",
  },
];
// const Promotion = [
//   {
//     image:
//       "https://reviewphongtap.com/wp-content/uploads/2023/01/bhd-pham-ngoc-thach-3.png",
//     title: "Combo khuyến mãi siêu hấp dẫn đến từ BHD",
//     content: "Mua càng nhiều, quý khách sẽ được cộng càng nhiêu điểm tích lũy để đổi thưởng",
//     like: "10",
//     cmt: "7",
//   },
//   {
//     image:
//       "https://atgt.bacgiang.gov.vn/documents/20181/15135109/1665885626871_final_logo+beta.jpg/98b83836-003e-4ca3-b882-96f4005b315c?t=1665885626904",
//     title: "Beta Cineplex trở lại với hàng loạt ưu đãi lớn",
//     content: "Từ thứ 7 tuần này (9/5), toàn bộ các rạp Beta Cinemas trên toàn quốc sẽ mở cửa trở lại. Mừng ngày trở lại, hàng loạt khuyến mại KHỦNG đổ bộ cùng lúc dàng cho các tín đồ của TIX đây.",
//     like: "10",
//     cmt: "7",
//   },
// ];
const QuickNews = () => {
  const Banner = (props) => {
    const { className } = props || {};
    const { image, title, content, like, cmt } = props.content || {};
    return (
      <div className={className}>
        <img
          className="card-image w-full rounded-md mb-2 shadow-md"
          src={image}
          alt="img"
        />
        <div className="card-text">
          <h3 className="card-title text-red-700 font-bold pb-2 cursor-pointer hover:text-slate-800 duration-300">
            {title}
          </h3>
          <p className="card-sub-title text-neutral-600 text-sm pb-3 indent-2 h-20 overflow-hidden">
            {content}
          </p>
        </div>
        <div className="flex text-xl gap-x-5">
          <div className="like">
            <AiOutlineLike className="mr-2 inline-block" />
            <span>{like}</span>
          </div>
          <div className="comment">
            <AiOutlineComment className="mr-2 inline-block" />
            <span>{cmt}</span>
          </div>
        </div>
      </div>
    );
  };
  const SmallBanner = (props) => {
    const { className } = props || {};
    const { image, title, like, cmt } = props.content || {};
    return (
      <div className={className}>
        <div className="flex cursor-pointer font-medium leading-4 hover:text-slate-800 hover:-translate-y-1 duration-300">
          <div className="basis-3/12">
            <img className="w-full h-full rounded-sm" src={image} alt="hinh anh phim" />
          </div>
          <div className="basis-9/12 pl-3">
            <h4 className="text-red-700">{title}</h4>
            <div className="flex text-xl gap-x-5 ">
              <div className="like">
                <AiOutlineLike className="mr-2 inline-block" />
                <span>{like}</span>
              </div>
              <div className="comment">
                <AiOutlineComment className="mr-2 inline-block" />
                <span>{cmt}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const content_1 = {
    label: <h3>Điện ảnh 24h</h3>,
    key: 1,
    children: (
      <div className="flex flex-wrap">
        <Banner className="top-item basis-6/12 px-4" content={Movie24h[0]} />
        <Banner className="top-item basis-6/12 px-4" content={Movie24h[1]} />
        <Banner className="bot-item basis-4/12 px-4" content={Movie24h[2]} />
        <Banner className="bot-item basis-4/12 px-4" content={Movie24h[3]} />
        <div className="bot-item basis-4/12 px-4 flex flex-wrap">
          <SmallBanner className="bot-list basis-full" content={Movie24h[4]} />
          <SmallBanner className="bot-list basis-full" content={Movie24h[5]} />
          <SmallBanner className="bot-list basis-full" content={Movie24h[6]} />
          <SmallBanner className="bot-list basis-full" content={Movie24h[7]} />
        </div>
      </div>
    ),
  };
  const content_2 = {
    label: <h3>Review</h3>,
    key: 2,
    children: (
      <div className="flex flex-wrap">
        <Banner className="top-item basis-6/12 px-4" content={Review[0]} />
        <Banner className="top-item basis-6/12 px-4" content={Review[1]} />
        <Banner className="bot-item basis-4/12 px-4" content={Review[2]} />
        <Banner className="bot-item basis-4/12 px-4" content={Review[3]} />
        <div className="bot-item basis-4/12 px-4 flex flex-wrap">
          <SmallBanner className="bot-list basis-full" content={Review[4]} />
          <SmallBanner className="bot-list basis-full" content={Review[5]} />
          <SmallBanner className="bot-list basis-full" content={Review[6]} />
          <SmallBanner className="bot-list basis-full" content={Review[7]} />
        </div>
      </div>
    ),
  };
  const content_3 = {
    label: <h3>Khuyến mãi</h3>,
    key: 3,
    children: (
        <div className="flex flex-wrap">
          <Banner className="top-item basis-6/12 px-4" content={Movie24h[0]} />
          <Banner className="top-item basis-6/12 px-4" content={Movie24h[1]} />
          <Banner className="bot-item basis-4/12 px-4" content={Movie24h[2]} />
          <Banner className="bot-item basis-4/12 px-4" content={Movie24h[3]} />
          <div className="bot-item basis-4/12 px-4 flex flex-wrap">
            <SmallBanner className="bot-list basis-full" content={Movie24h[4]} />
            <SmallBanner className="bot-list basis-full" content={Movie24h[5]} />
            <SmallBanner className="bot-list basis-full" content={Movie24h[6]} />
            <SmallBanner className="bot-list basis-full" content={Movie24h[7]} />
          </div>
        </div>
      ),
  };
  return (
    <div className="booking__news container mx-auto">
      <Tabs
        animated
        className="news__content w-4/5 mx-auto"
        defaultActiveKey="1"
        centered
        items={[content_1, content_2, content_3]}
      />
    </div>
  );
};
export default QuickNews;
