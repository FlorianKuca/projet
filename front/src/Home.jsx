import Note from './Note';
import Tag from './Tag';
import User from './User';

export default function Home() {
  return (
    <div className="home">
      <h1 className="text-2xl text-center my-5">Welcome to the Home Page</h1>
      
      {/* Section Notes */}
      <Note />
      {/* Séparateur */}
      <div className="divider my-8"></div>
      {/* Section Users */}
      <User />
      {/* Séparateur */}
      <div className="divider my-8"></div>
      {/* Section Tags */}
      <Tag />

      

    </div>
  );
}